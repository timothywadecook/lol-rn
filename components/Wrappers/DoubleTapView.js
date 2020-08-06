import React from "react";
import { View, TouchableOpacity } from "react-native";

export default function DoubleTapView({
  children,
  onDoubleTap,
  onLongPress,
  style,
}) {
  const [isDoubleTap, setIsDoubleTap] = React.useState(false);

  React.useEffect(() => {
    const handler = setTimeout(() => setIsDoubleTap(false), 300);
    return () => clearTimeout(handler);
  }, [isDoubleTap]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={style}
      onLongPress={onLongPress}
    >
      <View
        onStartShouldSetResponder={(e) => {
          if (isDoubleTap) {
            onDoubleTap();
          } else {
            setIsDoubleTap(true);
          }
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}
