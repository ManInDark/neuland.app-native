import { Stack } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Platform, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native-unistyles'

export default function TimetableStack(): JSX.Element {
    const { t } = useTranslation('navigation')
    const safeArea = useSafeAreaInsets()
    const topInset = safeArea.top
    const hasDynamicIsland = Platform.OS === 'ios' && topInset > 50
    const paddingTop = hasDynamicIsland ? topInset : 0
    return (
        <View style={{ ...styles.page, paddingTop }}>
            <Stack
                screenOptions={{
                    headerShown: true,
                    title: t('navigation.timetable'),
                    headerStyle: styles.headerBackground,
                    headerTitleStyle: styles.headerTextStyle,
                    headerTintColor: styles.tint.backgroundColor,
                    contentStyle: styles.background,
                }}
            ></Stack>
        </View>
    )
}

const styles = StyleSheet.create((theme) => ({
    background: { backgroundColor: theme.colors.background },
    headerBackground: { backgroundColor: theme.colors.card },
    headerTextStyle: { color: theme.colors.text },
    page: {
        backgroundColor: theme.colors.card,
        flex: 1,
    },
    tint: { backgroundColor: theme.colors.primary },
}))
