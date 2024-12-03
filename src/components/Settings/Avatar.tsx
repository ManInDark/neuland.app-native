import React from 'react'
import { View, type ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

/**
 * Avatar component that displays a circular image or icon with optional shadow and background color.
 * @param size The size of the avatar in pixels. Defaults to 50.
 * @param background The background color of the avatar.
 * @param children The content to display inside the avatar.
 * @returns A JSX element representing the Avatar component.
 */
const Avatar = ({
    size = 50,
    style,
    children,
}: {
    size?: number
    style?: ViewStyle
    children: JSX.Element
}): JSX.Element => {
    return <View style={{ ...styles.avatar(size), ...style }}>{children}</View>
}

const styles = StyleSheet.create((theme) => ({
    avatar: (size: number) => ({
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    }),
}))

export default Avatar
