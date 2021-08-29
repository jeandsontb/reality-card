import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { 
  ViroARScene,
  ViroConstants,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroARImageMarker,
  ViroAnimations,
  ViroAnimatedImage,
  ViroNode,
  ViroVideo
 } from '@viro-community/react-viro';



 ViroARTrackingTargets.createTargets({
    "businessCard" : {
      source : require('./res/business_card.jpg'),
      orientation : "Up",
      physicalWidth : 0.05 // real world width in meters
    }
  });
  
  ViroMaterials.createMaterials({
    imagePlaceholder: {
      diffuseColor: "rgba(255,255,255,1)"
    },
    quad: {
      diffuseColor: "rgba(0,0,0,0.5)"
    }
  });
  
  ViroAnimations.registerAnimations({
    animateImage:{
      properties:{
        positionX: 0.05,
        opacity: 1.0
      },
        easing:"Bounce", 
        duration: 500
    },
    animateViro: {
      properties: {
        positionZ: 0.02,
        opacity: 1.0,
      },
      easing:"Bounce", 
      duration: 500
    }
  });



export const BusinessCard = () => {

  const [isTracking, setIsTracking] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [runAnimation, setRunAnimation] = useState(false);
  const [runPhone, setRunPhone] = useState(false);
  const [runOff, setRunOff] = useState(false);

  const getNoTrackingUI = () => {    
    return (
      <ViroText text={
        initialized ? 'Initializing AR...' 
          : "No Tracking"
      }/>
    )
  }  

  const getARScene = () => {
    return (
      <ViroNode>
        <ViroARImageMarker target={"businessCard"} 
          onAnchorFound={() => {
              setRunAnimation(true);
              setTimeout(() => {
                setRunPhone(true);
              }, 2000);
            }}
          onAnchorRemoved={() => {
            setRunOff(true);
          }}
        >
          <ViroNode key="card">
            <ViroNode 
              opacity={0} position={[0.5, -0.02, 0]} 
              animation={{
                name:'animateImage', 
                run: runAnimation 
                }}
            >
              <ViroFlexView 
                  rotation={[-90, 0, 0]}
                  height={0.03} 
                  width={0.05}
                  style={styles.card} 
              >
                <ViroFlexView 
                  style={styles.cardWrapper} 
                >
                  <ViroImage
                    height={0.018}
                    width={0.055}
                    source={require('./res/avatar.jpg')}
                  />
                </ViroFlexView>
                <ViroFlexView 
                  style={styles.subText} 
                >
                  <ViroText 
                    width={0.01}
                    height={0.01}
                    textAlign="left"
                    textClipMode="None"
                    text="Jeandson" 
                    scale={[.01, .01, .01]}
                    style={styles.textStyle}
                  />
                  <ViroText 
                    width={0.01}
                    height={0.01}
                    textAlign="left"
                    textClipMode="None"
                    text="Tenoio" 
                    scale={[.01, .01, .01]}
                    style={styles.textStyle}
                  />
                  {/* <ViroAnimatedImage
                    height={0.01}
                    width={0.01}
                    loop={true}
                    source={require('./res/tweet.gif')}
                  /> */}
                </ViroFlexView>
              </ViroFlexView>
            </ViroNode> 
            <ViroNode opacity={0} position={[0, 0, 0]} 
              animation={{
                name:'animateViro', 
                run: runAnimation 
              }}
            >
              <ViroText 
                text="www.linkedin.com/in/jeandson"
                rotation={[-90, 0, 0]}
                scale={[.01, .01, .01]}
                style={styles.textStyle}
              />
            </ViroNode> 
            {runPhone &&
                <ViroNode opacity={0} position={[0.05, 0, 0.05]} 
                animation={{
                  name:'animateViro', 
                  run: runAnimation 
                }}
              >
                <ViroText 
                  text="(87) 9.9999-0000"
                  rotation={[-90, 0, 0]}
                  scale={[.01, .01, .01]}
                  style={styles.textStyle}
                />
              </ViroNode>                
            }
          </ViroNode>
        </ViroARImageMarker>
      </ViroNode>
    )
  }

  const _onClick = (source) => {
    console.log(source);
  }

  const _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      setIsTracking(true);
    } else if (state == ViroConstants.TRACKING_UNAVAILABLE) {
      setIsTracking(false);
      setRunAnimation(false);
    }
  }

  return (
    <>
      <ViroARScene onTrackingUpdated={_onInitialized} >

        {!isTracking &&
          getNoTrackingUI()
        }

        {isTracking &&
          getARScene()
        }
        
      </ViroARScene>
    </>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'top',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'column' 
  },
  cardWrapper: {
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    padding: 0.001, 
    flex: 1
  },
  subText: {
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    justifyContent: 'flex-start', 
    flex:1
  }
});