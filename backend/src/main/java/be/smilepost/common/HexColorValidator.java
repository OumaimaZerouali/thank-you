package be.smilepost.common;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.regex.Pattern;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class HexColorValidator {
  private static final Pattern HEX_COLOR_VALIDATOR = Pattern.compile(
    "^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$",
    Pattern.CASE_INSENSITIVE
  );

  public static void isValidColor(String field, String color, Notification notification) {
    if (color == null) {
      notification.addError("Field '%s' should not be null".formatted(field));
    } else if (!HEX_COLOR_VALIDATOR.matcher(color).matches()) {
      notification.addError("Field '%s' should be a valid hex color".formatted(field));
    }
  }
}
