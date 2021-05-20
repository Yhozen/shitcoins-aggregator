import React from "react";
import { Control, Path, useController } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";

type InputProps<T> = TextInputProps & {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: string;
};

type InputComponent<T> = React.PropsWithChildren<InputProps<T>>;

export const ControlledTextInput: <T extends Record<string, unknown>>(
  props: InputComponent<T>
) => ReturnType<React.FC<InputComponent<T>>> = ({
  name,
  control,
  defaultValue = "",
  ...props
}) => {
  const { field } = useController({ control, defaultValue, name });
  return (
    <TextInput
      {...props}
      value={field.value as string}
      onChangeText={field.onChange}
    />
  );
};
