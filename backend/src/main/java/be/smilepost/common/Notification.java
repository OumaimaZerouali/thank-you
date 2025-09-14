package be.smilepost.common;

import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@EqualsAndHashCode
public class Notification {

    private final List<String> errors = new ArrayList<>();

    public List<String> getErrors() {
        return errors;
    }

    public void addError(String error) {
        this.errors.add(error);
    }

    public boolean hasErrors() {
        return !this.errors.isEmpty();
    }

    public String errorMessage() {
        return String.join(", ", errors);
    }

    public static Notification empty() {
        return new Notification();
    }

    public static Notification of(String error) {
        var notification = empty();
        notification.addError(error);
        return notification;
    }

    public static Notification merge(Notification ... notifications) {
        var newNotification = empty();
        Arrays.stream(notifications).forEach(notification -> newNotification.getErrors().addAll(notification.getErrors()));
        return newNotification;
    }

    public Notification addNotification(Notification notification) {
        if (notification.hasErrors()) {
            errors.addAll(notification.getErrors());
        }
        return this;
    }
}
