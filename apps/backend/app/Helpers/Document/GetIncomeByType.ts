import DocumentType from "App/Types/Document/DocumentType";

export default function getIncomeByDocumentType(type: DocumentType) {
    switch (type) {
        case DocumentType.PURCHASED:
            return +1;
        
        case DocumentType.COOKED, DocumentType.THROWN:
            return -1;
    }
};