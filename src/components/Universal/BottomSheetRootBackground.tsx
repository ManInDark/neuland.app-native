import {
    BottomSheetBackdrop,
    type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import { BlurView } from 'expo-blur'
import React from 'react'
import { Platform, View } from 'react-native'
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles'

export const BottomSheetRootBackground = (): JSX.Element => {
    const darkIos = 'rgba(39, 39, 39, 0.4)'
    const lightIos = 'rgba(255, 255, 255, 0.5)'

    const dark = UnistylesRuntime.themeName === 'dark'
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
                intensity={dark ? 80 : 50}
                style={StyleSheet.absoluteFillObject}
                tint={dark ? 'dark' : 'light'}
            />
        </View>
    ) : (
        <View style={styles.bottomSheet} />
    )
}

export const renderBackdrop = (
    props: BottomSheetBackdropProps
): JSX.Element => (
    <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.3}
    />
)

const styles = StyleSheet.create((theme) => ({
    bottomSheet: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: theme.radius.lg,
        borderTopRightRadius: theme.radius.lg,
        overflow: 'hidden',
    },
}))
