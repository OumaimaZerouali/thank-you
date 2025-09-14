package be.smilepost.common;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class BooleanValidator {

    public static void isTrue(String field, Boolean value, Notification notification) {
        if (!Boolean.TRUE.equals(value)) {
            notification.addError("Field '%s' should be true".formatted(field));
        }
    }

    public static void isFalse(String field, Boolean value, Notification notification) {
        if (Boolean.TRUE.equals(value)) {
            notification.addError("Field '%s' should be false".formatted(field));
        }
    }

    public static void isNotNull(String field, Boolean value, Notification notification) {
        if (value == null) {
            notification.addError("Field '%s' should not be null".formatted(field));
        }
    }
}
