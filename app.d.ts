import "react-native";

declare module "react-native" {
  interface ViewProps {
    className?: string; // Thêm className vào ViewProps
  }

  interface TextProps {
    className?: string; // Thêm className vào TextProps
  }

  interface ScrollViewProps {
    className?: string; // Thêm className vào ScrollViewProps
  }

  interface FlatListProps<T> {
    className?: string; // Thêm className vào FlatListProps
  }

  interface SectionListProps<T> {
    className?: string; // Thêm className vào SectionListProps
  }

  interface TouchableOpacityProps {
    className?: string; // Thêm className vào TouchableOpacityProps
  }

  interface TouchableHighlightProps {
    className?: string; // Thêm className vào TouchableHighlightProps
  }

  interface TouchableWithoutFeedbackProps {
    className?: string; // Thêm className vào TouchableWithoutFeedbackProps
  }

  interface ImageProps {
    className?: string; // Thêm className vào ImageProps
  }

  interface ImageBackgroundProps {
    className?: string; // Thêm className vào ImageBackgroundProps
  }

  interface ButtonProps {
    className?: string; // Thêm className vào ButtonProps
  }

  interface ModalProps {
    className?: string; // Thêm className vào ModalProps
  }

  interface TextInputProps {
    className?: string; // Thêm className vào TextInputProps
  }

  interface ActivityIndicatorProps {
    className?: string; // Thêm className vào ActivityIndicatorProps
  }

  interface KeyboardAvoidingViewProps {
    className?: string; // Thêm className vào KeyboardAvoidingViewProps
  }

  interface SafeAreaViewProps {
    className?: string; // Thêm className vào SafeAreaViewProps
  }

  interface SwitchProps {
    className?: string; // Thêm className vào SwitchProps
  }

  interface PickerProps {
    className?: string; // Thêm className vào PickerProps
  }

  interface StatusBarProps {
    className?: string; // Thêm className vào StatusBarProps
  }

  interface PressableProps {
    className?: string; // Thêm className vào PressableProps
  }

  interface RefreshControlProps {
    className?: string; // Thêm className vào RefreshControlProps
  }

  interface VirtualizedListProps<T> {
    className?: string; // Thêm className vào VirtualizedListProps
  }

  interface SafeAreaProviderProps {
    className?: string; // Thêm className vào SafeAreaProviderProps
  }

  interface AppState {
    className?: string; // Thêm className vào AppState
  }

  interface ButtonGroupProps {
    className?: string; // Thêm className vào ButtonGroupProps
  }

  // Thêm nhiều giao diện khác nếu cần
}
