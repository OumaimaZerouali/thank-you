package be.smilepost.common;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ListValidator {

    public static void notEmpty(String field, List<?> value, Notification notification) {
        if (Objects.nonNull(value) && value.isEmpty()) {
            notification.addError("List '%s' should not be empty".formatted(field));
        }
    }
}
