package com.anipia.controller;

import com.anipia.model.ContactForm;
import com.anipia.service.ContactFormService;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@RestController
@RequestMapping("/export")
public class ContactFormExportController {

    private final ContactFormService contactFormService;

    public ContactFormExportController(ContactFormService contactFormService) {
        this.contactFormService = contactFormService;
    }

    //Exportuje všechny zprávy do PDF
    /*
    curl -o message_forms.pdf http://localhost:8080/export/pdf
    V prohlizeci:
    http://localhost:8080/export/pdf
    */
    @GetMapping("/pdf")
    public ResponseEntity<InputStreamResource> exportToPdf() {
        List<ContactForm> forms = contactFormService.getAllForms();

        ByteArrayInputStream bis = generatePdf(forms);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=message_forms.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }

    private ByteArrayInputStream generatePdf(List<ContactForm> forms) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try (PdfWriter writer = new PdfWriter(out);
             PdfDocument pdfDoc = new PdfDocument(writer);
             Document document = new Document(pdfDoc)) {

            document.add(new Paragraph("Seznam zprav"));

            for (ContactForm form : forms) {
                document.add(new Paragraph("Jméno: " + form.getName()));
                document.add(new Paragraph("Email: " + form.getEmail()));
                document.add(new Paragraph("Zpráva: " + form.getMessage()));
                document.add(new Paragraph("-------------------------------"));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}
