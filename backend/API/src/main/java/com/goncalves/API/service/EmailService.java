package com.goncalves.API.service;

import com.goncalves.API.infra.exception.EmailException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

/**
 * This service class is responsible for managing email-related operations.
 * It provides methods to send emails for resetting password and sharing projects.
 */
@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String fromMail;

    @Value("${app.base.url}")
    private String baseUrl;

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);


    /**
     * This method sends an email to reset the password.
     * It generates the email content, logs the operation, and sends the email.
     *
     * @param destinatario The recipient of the email.
     * @param token The token to be included in the email content.
     */
    public void enviarEmailRedefinirSenha(String destinatario, String token) {
        String assunto = "Reset your password";
        String corpo = "Use this token to change your password:\n" + token + " \n\n Thanks,\n the Clover team!";

        logger.info("Enviando e-mail para: {}", destinatario);
        logger.debug("Assunto: {}", assunto);
        logger.trace("Corpo: {}", corpo);

        try {
            enviarEmail(destinatario, assunto, corpo);
            logger.info("Email successfully sent.");
        } catch (Exception e) {
            logger.error("Erro ao enviar e-mail:", e);
            new EmailException("Erro ao enviar e-mail", e);
        }
    }

    /**
     * This method sends an email to share a project.
     * It generates the email content, logs the operation, and sends the email.
     *
     * @param destinatario The recipient of the email.
     * @param token The token to be included in the email content.
     * @param project The project to be shared.
     */
    public void shareProjectEmail(String destinatario, String token, String project) {
        String assunto = "Project sharing";
        String corpo = "Click on the link below to accept the invitation to this project:\n" +
                "<a href=\""+baseUrl+"/project/share/" + token + "/" + project + "\">Accept invite</a>\n\n" +
                "Thanks,\n the Clover team!";

        logger.info("Enviando e-mail para: {}", destinatario);
        logger.debug("Assunto: {}", assunto);
        logger.trace("Corpo: {}", corpo);

        try {
            sendEmailShareProject(destinatario, assunto, corpo);
            logger.info("Email successfully sent.");
        } catch (Exception e) {
            logger.error("Erro ao enviar e-mail:", e);
            new EmailException("Erro ao enviar e-mail", e);
        }
    }

    /**
     * This method sends an email to share a project.
     * It creates a MimeMessage, sets the email details, and sends the email.
     *
     * @param destinatario The recipient of the email.
     * @param assunto The subject of the email.
     * @param corpo The body of the email.
     * @throws MessagingException If an error occurs while sending the email.
     */
    public void sendEmailShareProject(String destinatario, String assunto, String corpo) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        try {
            helper.setFrom(fromMail);
            helper.setTo(destinatario);
            helper.setSubject(assunto);
            helper.setText(corpo, true); // Setar o corpo do e-mail como HTML
            logger.trace("Mensagem: {}", message);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            logger.error("Erro ao enviar e-mail:", e);
            new EmailException("Erro ao enviar e-mail", e);
        }
    }

    /**
     * This method sends an email.
     * It creates a SimpleMailMessage, sets the email details, and sends the email.
     *
     * @param destinatario The recipient of the email.
     * @param assunto The subject of the email.
     * @param corpo The body of the email.
     */
    public void enviarEmail(String destinatario, String assunto, String corpo) {
        SimpleMailMessage mensagem = new SimpleMailMessage();
        mensagem.setFrom(fromMail);
        mensagem.setTo(destinatario);
        mensagem.setSubject(assunto);
        mensagem.setText(corpo);
        logger.trace("Mensagem: {}", mensagem);
        javaMailSender.send(mensagem);
    }
}