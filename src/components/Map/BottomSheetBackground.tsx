import { BlurView } from 'expo-blur'
import React from 'react'
import { Platform, View } from 'react-native'
import {
    UnistylesRuntime,
    StyleSheet
} from 'react-native-unistyles'

const BottomSheetBackground = (): JSX.Element => {
    const dark = UnistylesRuntime.themeName === 'dark'
    const darkIos = 'rgba(0, 0, 0, 0.55)'
    const lightIos = 'rgba(200, 200, 200, 0.3)'
    return Platform.OS === 'ios' ? (
        <View
            style={[
                styles.bottomSheet,
                {
                    backgroundColor: dark ? darkIos : lightIos,
                },
            ]}
        >
            <BlurView
                intensity={85}
                style={StyleSheet.absoluteFillObject}
                tint={dark ? 'dark' : 'light'}
            />
        </View>
    ) : (
        <View style={styles.bottomSheet} />
    )
}

const styles = StyleSheet.create((theme) => ({
    bottomSheet: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: theme.radius.lg,
        borderTopRightRadius: theme.radius.lg,
        overflow: 'hidden',
    },
}))

export default BottomSheetBackground
