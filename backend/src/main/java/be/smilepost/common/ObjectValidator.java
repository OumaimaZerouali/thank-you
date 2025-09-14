package be.smilepost.common;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ObjectValidator {

    public static void notNull(String field, Object value, Notification notification) {
        if (value == null) {
            notification.addError("Field '%s' should not be null".formatted(field));
        }
    }
}
