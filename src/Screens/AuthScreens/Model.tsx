{
  /*Modal Start*/
}
<View style={styles.centeredView}>
  <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      navigation.goBack();
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            justifyContent: "center",
            height: 50,
            marginTop: hp(-5),
          }}
        >
          <AntDesign name="arrowleft" style={styles.iconsStyles} />
        </View>
        <View style={styles.TopView}>
          <View style={styles.topView}>
            <ScrollView>
              <View style={{ width: "100%" }}>
                <Text style={styles.verificationtext}>Verification</Text>
                <Text style={styles.vercodetext}>
                  Verification code has been sent to your email account
                </Text>
              </View>
              <View style={{ width: "100%" }}>
                <CodeField
                  ref={ref}
                  {...props}
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <View style={{ borderBottomWidth: 1 }} key={index}>
                      <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}
                      >
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              marginTop: Platform.OS === "ios" ? 50 : 15,
              width: "100%",
            }}
          >
            <Button
              navigation={navigation}
              label={
                loadx === true ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  "Next"
                )
              }
              onPress={() => {
                if (loadx === true) {
                } else {
                  verifyCode();
                }
              }}
            />
          </View>
          <View
            style={{
              width: "100%",
              bottom: 0,
              marginBottom: 0,
              position: "absolute",
            }}
          >
            <View style={styles.footerviewmain}>
              <View style={{ width: "65%", alignItems: "flex-end" }}>
                <Text style={styles.donottext}>
                  Didn’t get verification code?
                </Text>
              </View>
              <View style={{ width: "35%" }}>
                <Pressable
                  onPress={() => {
                    if (loadxx === true) {
                    } else {
                      resendCode();
                    }
                  }}
                >
                  <Text style={styles.singuptext}>
                    {loadxx === true ? (
                      <ActivityIndicator size="small" color="#000" />
                    ) : (
                      "Resend Email"
                    )}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  </Modal>
</View>;
{
  /* Modal End*/
}
