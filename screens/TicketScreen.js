import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { COLORS, images, SIZES, icons } from '../constants'



const TicketScreen = ({ route, navigation }) => {
  const [userData,setUserData]=useState(route.params.userData);
  const [ticketInfo, setTicketInfo] = useState(route.params.item);
  console.log("Ticket Details", ticketInfo);
  console.log("User Details", userData);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#E4F9F5'
      }}
    >
      <View
        style={{
          flex: 0.3,
          backgroundColor: '#E4F9F5',
          justifyContent: 'center'
        }}
      >
        <Image
          style={{
            alignSelf: 'center',

          }}
          source={icons.balance}
        />
      </View>
      <Animatable.View
        style={{
          flex: 0.7,
          backgroundColor: COLORS.white,
          borderRadius: 20,
          top: -15,
          flexDirection: 'column',
          padding: 10
        }}
        animation="fadeInUpBig"
      >
        <View
          style={{
            flex: 0.125,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
            }}
          >
            <Image
              source={icons.bus}
              style={{
                height: 30, width: 30
              }}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 25,
                fontFamily: "Ubuntu-Regular",
                color: COLORS.gray
              }}
            >
              Journey Tickets
            </Text>
          </View>
          {/* Heading + Icon*/}
        </View>
        <View
          style={{
            flex: 0.15,
            flexDirection: 'row'
          }}
        >
          {/* From: */}
          <View
            style={{
              flex: 0.5,
              flexDirection: 'column'
            }}
          >
            <View
              style={{
                flex: 0.3,
              }}
            >
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 15,
                  color: COLORS.lightGray
                }}
              >
                From
              </Text>
            </View>
            <View
              style={{
                flex: 0.7,
                flexDirection: 'row',
                alignItems: 'center'
                // justifyContent:'center'
              }}
            >
              <Image
                source={icons.from}
                style={{
                  height: 20, width: 20,
                  tintColor: COLORS.gray
                }}

              />
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 15,
                  color: COLORS.gray,
                  marginLeft: 10
                }}
              >
                {ticketInfo.origStopName}
              </Text>
            </View>
          </View>
          {/* To: */}
          <View
            style={{
              flex: 0.5,
              flexDirection: 'column'
            }}
          >
            <View
              style={{
                flex: 0.3,
              }}
            >
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 15,
                  color: COLORS.lightGray
                }}
              >
                To
              </Text>
            </View>
            <View
              style={{
                flex: 0.7,
                flexDirection: 'row',
                alignItems: 'center'
                // justifyContent:'center'
              }}
            >
              <Image
                source={icons.pinpoint}
                style={{
                  height: 20, width: 20,
                  tintColor: COLORS.gray
                }}

              />
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 15,
                  color: COLORS.gray,
                  marginLeft: 10
                }}
              >
                {ticketInfo.destStopName}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.15,
            flexDirection: 'row'
          }}
        >
          {/* Passengers + Price*/}
          <View
            style={{
              flex: 0.5,

            }}
          >
            <View
              style={{
                flex: 0.3,
              }}
            >
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 15,
                  color: COLORS.lightGray
                }}
              >
                Passenger
              </Text>
            </View>
            <View
              style={{
                flex: 0.7,
                flexDirection: 'row'
              }}
            >
              <Image
                source={icons.accSettings}
                style={{
                  width: 25, height: 25
                }}
              />

              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 15,
                  color: COLORS.gray,
                  marginLeft: 5
                }}
              >
                {userData.fullName}
              </Text>
            </View>

          </View>
          <View
            style={{
              flex: 0.5,

            }}
          >
            <View
              style={{
                flex: 0.3,
              }}
            >
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 15,
                  color: COLORS.lightGray
                }}
              >
                Amount:
              </Text>
            </View>
            <View
              style={{
                flex: 0.7,
                flexDirection: 'row'
              }}
            >
              <Image
                source={icons.dollar}
                style={{
                  width: 25, height: 25,
                  // marginLeft:
                }}
              />

              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 15,
                  color: COLORS.gray,
                  marginLeft: 5
                }}
              >
                Rs. {ticketInfo.amount}
              </Text>
            </View>

          </View>
        </View>


        <View
          style={{
            flex: 0.15,
            flexDirection: 'row'

          }}
        >
          {/* Date + Time*/}
          <View
            style={{
              flex: 0.5,

            }}
          >
            <View
              style={{
                flex: 0.3,
              }}
            >
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 15,
                  color: COLORS.lightGray
                }}
              >
                Time:
              </Text>
            </View>
            <View
              style={{
                flex: 0.7,
                flexDirection: 'row'
              }}
            >
              <Image
                source={icons.clock}
                style={{
                  width: 25, height: 25,
                }}
              />

              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 15,
                  color: COLORS.gray,
                  marginLeft: 5
                }}
              >
                {ticketInfo.boardingTime}
              </Text>
            </View>

          </View>
          <View
            style={{
              flex: 0.5,

            }}
          >
            <View
              style={{
                flex: 0.3,
              }}
            >
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 15,
                  color: COLORS.lightGray
                }}
              >
                Date:
              </Text>
            </View>
            <View
              style={{
                flex: 0.7,
                flexDirection: 'row'
              }}
            >
              <Image
                source={icons.calendar}
                style={{
                  width: 25, height: 25,
                  // marginLeft:
                }}
              />

              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 15,
                  color: COLORS.gray,
                  marginLeft: 5
                }}
              >
                {ticketInfo.date}
              </Text>
            </View>

          </View>
        </View>
      </Animatable.View>
    </View>
  )
}

export default TicketScreen

const styles = StyleSheet.create({})