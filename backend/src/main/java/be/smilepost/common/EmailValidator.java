package be.smilepost.common;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.regex.Pattern;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class EmailValidator {

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$",
            Pattern.CASE_INSENSITIVE
    );

    public static void isValidEmail(String field, String email, Notification notification) {
        if (email == null) {
            notification.addError("Field '%s' should not be null".formatted(field));
        } else if (!EMAIL_PATTERN.matcher(email).matches()) {
            notification.addError("Field '%s' should be a valid email address".formatted(field));
        }
    }
}
