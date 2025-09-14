package be.smilepost.common;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class StringValidator {

    public static void notBlank(String field, String value, Notification notification) {
        if (StringUtils.isBlank(value)) {
            notification.addError("Field '%s' should not be blank".formatted(field));
        }
    }
}
