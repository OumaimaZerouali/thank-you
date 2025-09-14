package be.smilepost.common;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class Creation<T> {

    private final T value;
    private final Notification notification;

    public static <T> Creation<T> of(T value, Notification notification) {
        return new Creation<>(value, notification);
    }

    public static <T> Creation<T> of(T value) {
        return new Creation<>(value, new Notification());
    }

    public static <T> Creation<T> empty(Notification notification) {
        return new Creation<>(null, notification);
    }
}
