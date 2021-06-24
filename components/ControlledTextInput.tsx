import React from "react";
import { Control, Path, useController } from "react-hook-form";
import { TextInput, TextInputProps } from "./Themed";

type ControlledTextInputProps<T> = TextInputProps & {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: string;
};

export const ControlledTextInput: <T extends Record<string, unknown>>(
  props: ControlledTextInputProps<T>
) => ReturnType<React.FC<ControlledTextInputProps<T>>> = ({
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
