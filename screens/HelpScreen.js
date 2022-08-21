import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import { auth, db, realdb, firebase } from '../firebase'
import { COLORS,icons } from '../constants'
import Moment from 'moment';
import { Card } from 'react-native-shadow-cards';

const HelpScreen = ({ navigation: { goBack } }) => {

  const [complaint, setComplaint] = useState({
    userFullName: "",
    complaint: "",
  })
  const [errorMessage, setErrorMessage] = useState({
    title:"",
    message:""
  });
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    var docRef = db().collection("users").doc(auth().currentUser.uid);
    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("User Information", doc.data());
        setComplaint({
          ...complaint,
          userID:doc.id,
          userFullName: doc.data().fullName
        });
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, [])


  Moment.locale('en');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.BluishBalance
      }}
    >
      <View style={{
        flex: 0.3,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
      }}>
        <Text style={
          {
            color: '#fff',
            // fontWeight: 'bold',
            fontSize: 30,
            fontFamily: 'Ubuntu-Bold'
          }
        }>Help/Feedback</Text>
      </View>
      <Animatable.View
        animation='fadeInUpBig'
        style={{
          flex: 0.7,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 30
        }}
      >
        <View
          style={{
            flex: 0.12,
            marginTop: 15,
            // borderWidth: 1
          }}
        >
          <Text
            style={{
              color: COLORS.gray,
              fontFamily: 'Ubuntu-Regular',
              fontSize: 20
            }}
          >
            Please enter your complain details:
          </Text>
        </View>
        <View
          style={{
            flex: 0.80,
          }}
        >
          <View>
            <TextInput
              placeholder='Enter complaint details'
              placeholderTextColor={'#B5B5B5'}
              onChangeText={(text) => {
                setComplaint({
                  ...complaint,
                  complaint: text
                })

              }}
              style={styles.EmailInputStyle}
            />
            <TouchableOpacity
              
              onPress={() => {
                if (complaint.complaint != "") {
                  console.log("Success Scn");
                  db()
                    .collection('complaints')
                    .doc()
                    .set({
                      ...complaint,
                      date: Moment(new Date()).format('DD MMMM YYYY'),
                    })
                    .then(()=>{
                      setErrorModal(true)
                      setErrorMessage({
                        title:'Success',
                        message:"Your complaint has been submitted, you will be contacted by administration soon."
                      })
                    })
                }
                else {
                  console.log("Failure Scn");
                  setErrorModal(true)
                  setErrorMessage({
                    title:'Error',
                    message:"Please enter a valid complaint to continue."
                  })
                }
              }}
              style={styles.LoginButtonStyle}
            >
              <Text
                style={styles.ButtonTextStyle}
              >Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { goBack() }}
              style={styles.RegisterButton}
            >
              <Text
                style={styles.ButtonTextStyle}
              >Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Animatable.View>
      {
        errorModal &&
        <Animatable.View
          animation='fadeInUpBig'
        >
          <Card
            animationType='fade'
            style={{
              position:"absolute",
              height: 300, width: 300,
              backgroundColor: COLORS.white,
              borderRadius: 20,
              alignSelf: 'center',
              top: -450,
              elevation: 50,
              flexDirection: 'column'
            }}>
            <Text
              style={{
                fontFamily: "Ubuntu-Regular",
                fontSize: 25,
                color: COLORS.gray,
                textAlign: 'center',
                marginTop: 20
              }}
            >
              {errorMessage.title}
            </Text>
            <Image
              style={{
                alignSelf: 'center',
                marginTop: 30,
                height: 100,
                width: 100,
                // tintColor: COLORS.RupeesPink
              }}
              source={icons.busStick}
            />
            <Text
              style={{
                fontFamily: "Ubuntu-Regular",
                fontSize: 15,
                color: '#DCDCDC',
                textAlign: 'center',
                paddingHorizontal: 10,
                marginTop: 20
              }}
            >
              {errorMessage.message}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setErrorModal(false);
                setErrorMessage("");
              }}
              style={{
                height: 39,
                width: 110,
                borderRadius: 20,
                top: 10,
                backgroundColor: COLORS.LoginGreen,
                alignSelf: 'center',
                textAlign: 'center',
              }}
            >
              <Text
                style={styles.ButtonTextStyle}
              >Okay</Text>
            </TouchableOpacity>
          </Card>
        </Animatable.View>
      }
    </View>
  )
}

export default HelpScreen

const styles = StyleSheet.create({
  RegisterButton:
  {
    height: 39,
    width: '90%',
    borderRadius: 10,
    backgroundColor: COLORS.RegisterGray,
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: 5,
  },
  LoginButtonStyle:
  {
    height: 39,
    width: '90%',
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: COLORS.LoginGreen,
    alignSelf: 'center',
    textAlign: 'center',
  },
  ButtonTextStyle: {
    fontFamily: "Ubuntu-Regular",
    textAlign: 'center',
    paddingVertical: 10
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.BluishBalance
  },
  header: {
    flex: 0.3,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 0.7,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    // fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Ubuntu-Bold'
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    height: '100%',
    marginLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  EmailInputStyle: {
    paddingHorizontal: 25,
    color: COLORS.black,
    width: '100%',
    borderRadius: 20,
    marginVertical: 10,
    backgroundColor: COLORS.lightGray,
    fontFamily: "Ubuntu-Regular",
    height: 100
  },
  PhoneNumberInput: {
    paddingHorizontal: 25,
    color: COLORS.black,
    width: '60%',
    borderRadius: 20,
    marginVertical: 10,
    backgroundColor: COLORS.lightGray,
    fontFamily: "Ubuntu-Regular"
  },
})