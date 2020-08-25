function FeedHeader({ showFilter, setShowFilter }) {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: theme.windowWidth,
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderBottomColor: theme.bg,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <View
          style={{
            // backgroundColor: theme.white,
            marginRight: 5,
            alignItems: "center",
            justifyContent: "center",
            height: 30,
            width: 30,
            borderRadius: 15,
          }}
        >
          <Image source={logo} style={{ width: 28, height: 28 }} />
        </View>
        <T.FancyH1
          style={{
            color: theme.purple,
            fontSize: 20,
            textAlign: "center",
            paddingRight: 10,
          }}
        >
          Like Out Loud
        </T.FancyH1>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* <TouchableOpacity
            style={{
              backgroundColor: theme.iconBg,
              marginHorizontal: 10,
              alignItems: "center",
              justifyContent: "center",
              height: 30,
              width: 30,
              borderRadius: 15,
              // borderWidth: 1,
              // borderColor: theme.iconDefault,
            }}
            onPress={() => setShowFilter(!showFilter)}
          >
            <Feather
              name="filter"
              size={18}
              color={showFilter ? theme.purple : theme.iconDefault}
            />
          </TouchableOpacity>  */}

        <TouchableOpacity
          style={{
            backgroundColor: theme.iconBg,
            marginHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
            height: 30,
            width: 30,
            borderRadius: 15,
            // borderWidth: 1,
            // borderColor: theme.iconDefault,
          }}
          onPress={() => setShowFilter(!showFilter)}
        >
          <Feather name="search" size={18} color={theme.iconDefault} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginLeft: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Profile")}
        >
          <Avatar size={30} user={user} />
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
          style={{
            backgroundColor: theme.iconDefault,
            marginHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
            height: 30,
            width: 30,
            borderRadius: 15,
            // borderWidth: 1,
            borderColor: theme.iconDefault,
          }}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="md-person" size={18} color={theme.wallbg} />
        </TouchableOpacity> */}

      {/* <TouchableOpacity
          style={{
            // backgroundColor: theme.white,
            marginHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
            height: 30,
            width: 30,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: theme.iconDefault,
          }}
          onPress={() => navigation.navigate("Create")}
        >
          <Ionicons name="md-create" size={18} color={theme.iconDefault} />
        </TouchableOpacity> */}
    </View>
  );
}
