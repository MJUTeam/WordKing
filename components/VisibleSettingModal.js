import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { BLACK, GRAY, PRIMARY, WHITE } from '../colors';
import HR from './HR';
import IconButton from './IconButton';
import { RadioButton, Switch } from 'react-native-paper';
import { HideWord } from './Marking';

const VisibleSettingModal = ({
  modalVisible,
  setModalVisible,
  hideWord,
  setHideWord,
  none,
  setNone,
  memorized,
  setMemorized,
  confusion,
  setConfusion,
}) => {
  return (
    <Modal
      isVisible={modalVisible}
      backdropColor="rgba(0, 0, 0, 0.5)"
      onBackdropPress={() => setModalVisible(false)}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.headText}>보기 설정</Text>
          </View>
          <IconButton onPress={() => setModalVisible(false)} iconName={'close'} />
        </View>
        <HR styles={{ line: { borderBottomColor: GRAY.LIGHT } }} />
        <View>
          <RadioButton.Group onValueChange={(value) => setHideWord(value)} value={hideWord}>
            <View style={styles.selectHideView}>
              <Text style={styles.mainText}>숨기기 설정</Text>
            </View>
            <View style={styles.selectHideView}>
              <Text
                style={[
                  styles.viewText,
                  { color: hideWord === HideWord.NONE ? PRIMARY.DARK : BLACK },
                ]}
              >
                미적용
              </Text>
              <RadioButton value={HideWord.NONE} color={PRIMARY.DARK} />
            </View>
            <View style={styles.selectHideView}>
              <Text
                style={[
                  styles.viewText,
                  { color: hideWord === HideWord.ENGLISH ? PRIMARY.DARK : BLACK },
                ]}
              >
                영단어 숨기기
              </Text>
              <RadioButton value={HideWord.ENGLISH} color={PRIMARY.DARK} />
            </View>
            <View style={styles.selectHideView}>
              <Text
                style={[
                  styles.viewText,
                  { color: hideWord === HideWord.KOREAN ? PRIMARY.DARK : BLACK },
                ]}
              >
                단어뜻 숨기기
              </Text>
              <RadioButton value={HideWord.KOREAN} color={PRIMARY.DARK} />
            </View>
          </RadioButton.Group>
        </View>
        <HR styles={{ line: { borderBottomColor: GRAY.LIGHT } }} />
        <View>
          <View style={styles.selectHideView}>
            <Text style={styles.mainText}>마크</Text>
          </View>
          <View style={styles.markView}>
            <Text style={styles.viewText}> 미분류 단어 </Text>
            <Switch value={none} onValueChange={(value) => setNone(value)} color={PRIMARY.DARK} />
          </View>
          <View style={styles.markView}>
            <Text style={styles.viewText}> 외운 단어 </Text>
            <Switch
              value={memorized}
              onValueChange={(value) => setMemorized(value)}
              color={PRIMARY.DARK}
            />
          </View>
          <View style={styles.markView}>
            <Text style={styles.viewText}> 헷갈리는 단어 </Text>
            <Switch
              value={confusion}
              onValueChange={(value) => setConfusion(value)}
              color={PRIMARY.DARK}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flexDirection: 'column',
    marginTop: '100%',
    width: '100%',
    height: '100%',
    margin: 0,
    borderRadius: 20,
    backgroundColor: WHITE,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  headText: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 40,
  },
  mainText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectHideView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 12,
  },
  viewText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  markView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 12,
  },
});

export default VisibleSettingModal;
