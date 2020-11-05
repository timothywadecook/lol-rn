function StickyFooter({ y }) {
  return (
    <AnimatedFooter y={y} dy={100 + theme.topPad}>
      <Animated.View
        style={{
          opacity: Animated.interpolate(y, {
            inputRange: [500, 501],
            outputRange: [0, 1],
          }),
        }}
      >
        <WindowWidthRow
          blur={true}
          style={{
            justifyContent: "space-between",
            paddingBottom: theme.topPad,
          }}
          pad={true}
        >
          <Button
            icon={
              <Icon
                name="chevron-up"
                color={theme.iconDefault}
                type="feather"
              />
            }
            title="Top"
            titleStyle={{ color: theme.iconDefault, paddingLeft: 8 }}
            type="clear"
          />

          {/* <Button
              icon={<Icon name="thumbs-up" color={theme.purple} type="feather" />}
              title="Recommend"
              titleStyle={{ color: theme.purple, paddingLeft: 8 }}
              type="clear"
            /> */}
        </WindowWidthRow>
      </Animated.View>
    </AnimatedFooter>
  );
}
