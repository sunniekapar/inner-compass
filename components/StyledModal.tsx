import React, { ReactNode } from 'react';
import { Modal, SafeAreaView, View } from 'react-native';
import Button from './Button';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  children: ReactNode;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  className: string;
}

const StyledModal: React.FC<ModalProps> = ({
  children,
  modalVisible,
  setModalVisible,
  className,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <SafeAreaView className="items-center justify-center flex-1 bg-slate-rgba">
        <Card className="flex-1 w-7/12 px-0 m-20 h-2/3">
          <Button
            variant="clear"
            size="lg"
            onPress={() => setModalVisible(false)}
            className="flex-row justify-end"
          >
            <Ionicons name="md-close-sharp" size={24} color="black" />
          </Button>
          <View className={twMerge('items-center flex-1', className)}>
            {children}
          </View>
        </Card>
      </SafeAreaView>
    </Modal>
  );
};

export default StyledModal;
