import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker to use local file from public directory
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PDFUploader = ({ onDataExtracted }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const extractDataFromText = (text) => {
        const data = {};
        let fieldsFound = 0;

        console.log('Full PDF text:', text); // Debug

        // Extract client name - in this PDF format, the name appears before CNPJ/CPF
        // Pattern: "NAME CNPJ/CPF: number"
        let nameMatch = text.match(/([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ][A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑa-záàâãéèêíïóôõöúçñ\s]{10,}?)\s+CNPJ\/CPF:/i);
        if (!nameMatch) {
            // Try pattern with "Nome" label
            nameMatch = text.match(/Nome[:\s]+([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ][A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑa-záàâãéèêíïóôõöúçñ\s]+?)(?:\s{2,}|Endereço|CPF|CNPJ|RUA)/i);
        }
        if (!nameMatch) {
            // Last resort - capture uppercase name before address
            nameMatch = text.match(/([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]{15,}?)\s+(?:RUA|AV\.|AVENIDA|TRAVESSA)/i);
        }
        if (nameMatch) {
            let clientName = nameMatch[1].trim();
            // Clean up: remove classification text that might be included
            clientName = clientName.replace(/^.*?(?:RESIDENCIAL|COMERCIAL|INDUSTRIAL|RURAL)\s+(?:NORMAL\s+)?(?:CONVENCIONAL\s+)?/i, '').trim();
            // Also remove any "B B1" or similar classification codes
            clientName = clientName.replace(/^B\s+B\d+\s+/i, '').trim();
            data.clientName = clientName;
            fieldsFound++;
        }

        // Extract CNPJ/CPF
        const cnpjMatch = text.match(/(?:CNPJ\/CPF|CPF\/CNPJ|CNPJ|CPF)[:\s]*([0-9.\/-]+)/i);
        if (cnpjMatch) {
            data.cnpj = cnpjMatch[1].trim();
            fieldsFound++;
        }

        // Extract installation number (UC)
        // Try multiple patterns as it appears in different formats
        let installMatch = text.match(/(?:Nº DA INSTALAÇÃO|INSTALAÇÃO|UC)[:\s]+([0-9]+)/i);
        if (!installMatch) {
            // In Equatorial GO PDFs, the UC number appears near the end, often standalone
            // Look for a 11-digit number that appears multiple times (typical UC format)
            const ucPattern = /\b(\d{11})\b/g;
            const matches = text.match(ucPattern);
            if (matches && matches.length > 0) {
                // Use the most common 11-digit number (likely the UC)
                const ucCounts = {};
                matches.forEach(num => {
                    ucCounts[num] = (ucCounts[num] || 0) + 1;
                });
                const mostCommon = Object.keys(ucCounts).reduce((a, b) => ucCounts[a] > ucCounts[b] ? a : b);
                data.installationId = mostCommon;
                fieldsFound++;
            }
        } else {
            data.installationId = installMatch[1].trim();
            fieldsFound++;
        }

        // Extract distributor
        if (text.match(/EQUATORIAL/i)) {
            data.distributor = 'EQUATORIAL GO';
            fieldsFound++;
        } else if (text.match(/CELG/i)) {
            data.distributor = 'CELG';
            fieldsFound++;
        } else if (text.match(/ENEL/i)) {
            data.distributor = 'ENEL';
            fieldsFound++;
        }

        // Extract consumption - in this PDF, look for "CONSUMO FATURADO(kWh)" or standalone numbers before kWh
        let consumptionMatch = text.match(/CONSUMO FATURADO\(kWh\)[^\d]*(\d+[,.]?\d*)/i);
        if (!consumptionMatch) {
            // Try pattern: "ENERGIA ATIVA - KWH" followed by numbers
            consumptionMatch = text.match(/ENERGIA ATIVA[^0-9]*KWH[^0-9]+\d+[^0-9]+(\d+)/i);
        }
        if (!consumptionMatch) {
            // Generic pattern - number followed by kWh
            consumptionMatch = text.match(/(\d+[,.]?\d*)\s*kWh/i);
        }
        if (consumptionMatch) {
            const consumption = consumptionMatch[1].replace(/\./g, '').replace(',', '.');
            data.monthlyConsumption = parseFloat(consumption);
            fieldsFound++;
        }

        // Extract network type (needed for auto-calculation)
        const networkMatch = text.match(/Tipo de fornecimento:\s*([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]+)/i);
        if (networkMatch) {
            data.networkType = networkMatch[1].trim(); // e.g. MONOFÁSICO
            fieldsFound++;
        }

        // Extract rate/tariff - look for "CONSUMO SCEE" or "CONSUMO kWh" with rate
        // Format log: "CONSUMO   kWh   0,949506 146,00"
        let rateMatch = text.match(/CONSUMO SCEE\s+kWh\s+([0-9]+[,.]?[0-9]+)/i);
        if (!rateMatch) {
            // Specific patterns for Equatorial GO
            rateMatch = text.match(/CONSUMO\s+kWh\s+([0-9]+[,.]?[0-9]+)/i);
        }
        if (!rateMatch) {
            // General "Preço/Price" column search? 
            // Often just looked for R$/kWh
            rateMatch = text.match(/([0-9]+[,.]?[0-9]+)\s*R?\$?\/kWh/i);
        }

        if (rateMatch) {
            data.currentRate = parseFloat(rateMatch[1].replace(/\./g, '').replace(',', '.'));
            fieldsFound++;
        }

        // Extract minimum cost - or calculate if missing
        let minCostMatch = text.match(/(?:Custo de Disponibilidade|CUSTO DE DISPONIBILIDADE)[:\s]*R?\$?\s*([0-9]+[,.]?[0-9]+)/i);

        if (minCostMatch) {
            data.minCost = parseFloat(minCostMatch[1].replace(/\./g, '').replace(',', '.'));
            fieldsFound++;
        } else if (data.currentRate) {
            // Calculate based on supply type found or inferred
            // MONOFÁSICO = 30 kWh, BIFÁSICO = 50 kWh, TRIFÁSICO = 100 kWh
            let availabilityKwh = 30; // Default to monofásico

            // Check extracted networkType first, then scan text
            const typeStr = (data.networkType || text).toUpperCase();

            if (typeStr.match(/BIFÁSICO|BIFASICO/i)) {
                availabilityKwh = 50;
            } else if (typeStr.match(/TRIFÁSICO|TRIFASICO/i)) {
                availabilityKwh = 100;
            }
            // else MONOFASICO (30)

            // Calculate minimum cost = availability kWh * rate
            // Note: Does not include public lighting buffer here, 
            // but the ProposalView handles the display buffer.
            data.minCost = parseFloat((availabilityKwh * data.currentRate).toFixed(2));
            fieldsFound++;
        } else {
            data.minCost = 0;
        }

        console.log('Extracted data:', data, 'Fields found:', fieldsFound);
        console.log('Client name:', data.clientName);
        console.log('CNPJ:', data.cnpj);
        console.log('Installation:', data.installationId);
        console.log('Consumption:', data.monthlyConsumption);
        return { data, fieldsFound };
    };

    const extractTextFromPDF = async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let fullText = '';

        // Extract text from all pages (usually first 2 pages have the info we need)
        const numPages = Math.min(pdf.numPages, 2);
        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
        }

        return fullText;
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setError('Por favor, selecione um arquivo PDF válido.');
            return;
        }

        setIsProcessing(true);
        setError('');
        setSuccess('');

        try {
            const text = await extractTextFromPDF(file);
            const { data: extractedData, fieldsFound } = extractDataFromText(text);

            if (fieldsFound === 0) {
                setError('Não foi possível extrair dados do PDF. Tente preencher manualmente.');
            } else {
                onDataExtracted(extractedData);
                setSuccess(`✅ ${fieldsFound} campos preenchidos automaticamente!`);
                setTimeout(() => setSuccess(''), 3000);
            }
        } catch (err) {
            console.error('PDF parsing error:', err);
            setError('Erro ao processar o PDF. Tente preencher manualmente.');
        } finally {
            setIsProcessing(false);
            // Reset file input
            event.target.value = '';
        }
    };

    return (
        <div className="pdf-uploader" style={{ marginBottom: '20px', padding: '15px', border: '2px dashed var(--primary-color)', borderRadius: '8px', textAlign: 'center', backgroundColor: '#f0f9f8' }}>
            <h3 style={{ marginTop: 0, color: 'var(--primary-color)', fontSize: '16px' }}>📄 Upload da Fatura</h3>
            <p style={{ fontSize: '13px', color: '#666', margin: '5px 0 15px 0' }}>Faça upload da fatura de energia para preencher automaticamente</p>

            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                disabled={isProcessing}
                style={{ display: 'none' }}
                id="pdf-upload"
            />

            <label
                htmlFor="pdf-upload"
                className="btn"
                style={{
                    display: 'inline-block',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    opacity: isProcessing ? 0.6 : 1,
                    padding: '8px 16px',
                    fontSize: '14px'
                }}
            >
                {isProcessing ? '⏳ Processando...' : '📤 Selecionar Fatura (PDF)'}
            </label>

            {error && (
                <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px', fontSize: '13px' }}>
                    {error}
                </div>
            )}

            {success && (
                <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold' }}>
                    {success}
                </div>
            )}
        </div>
    );
};

export default PDFUploader;
