package be.smilepost.adapter.repository;

import be.smilepost.domain.Card;
import be.smilepost.usecase.MailRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Slf4j
@Service
public class CardMailService implements MailRepository {
  private final JavaMailSender mailSender;

  @Value("${properties.mail.fromAddress}")
  private String fromAddress;

  @Value("${properties.mail.card.toAddress:}")
  private String toAddress;

  public CardMailService(JavaMailSender mailSender) {
    this.mailSender = mailSender;
  }

  @Override
  public void send(Card card) {
    try {
      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, StandardCharsets.UTF_8.name());

      helper.setFrom(fromAddress);
      helper.setTo(toAddress != null && !toAddress.isBlank() ? toAddress : card.getRecipientEmail());

      helper.setSubject("SmilePost card from " + card.getSenderName());

      var emailBody = buildEmailContent(card);

      helper.setText(emailBody, true);
      mailSender.send(mimeMessage);

      log.info("Card mail sent to {}", card.getRecipientEmail());

    } catch (MessagingException e) {
      log.error("Error while sending card mail", e);
      throw new RuntimeException("Could not send mail", e);
    }
  }

  private String buildEmailContent(Card card) {
    return """
                <h2>You’ve received a SmilePost card! 🎉</h2>
                <p><b>From:</b> %s<br>
                <b>To:</b> %s (%s)<br><br>
                <b>Message:</b><br>
                %s</p>
                <hr>
                <p><a href="%s">Click here to view your card</a></p>
                """.formatted(
      card.getSenderName(),
      card.getRecipientName(),
      card.getRecipientEmail(),
      card.getMessage(),
      card.getImageUrl()
    );
  }
}

