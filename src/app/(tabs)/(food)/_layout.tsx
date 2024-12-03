import { Stack } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Platform, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet, createUnistylesComponent } from 'react-native-unistyles'

export default function FoodStack(): JSX.Element {
    const { t } = useTranslation('navigation')
    const safeArea = useSafeAreaInsets()
    const topInset = safeArea.top
    const hasDynamicIsland = Platform.OS === 'ios' && topInset > 50
    const paddingTop = hasDynamicIsland ? topInset : 0

    const StyledStack = createUnistylesComponent(Stack, (theme) => ({
        screenOptions: {
            headerStyle: {
                backgroundColor: theme.colors.card,
            },
            headerTitleStyle: {
                color: theme.colors.text,
            },
            headerTintColor: theme.colors.primary,
            contentStyle: {
                backgroundColor: theme.colors.background,
            },
            title: t('navigation.food'),
        },
    }))

    return (
        <View style={[styles.page, { paddingTop }]}>
            <StyledStack />
        </View>
    )
}

const styles = StyleSheet.create((theme) => ({
    background: { backgroundColor: theme.colors.background },
    headerBackground: { backgroundColor: theme.colors.card },
    headerTextStyle: { color: theme.colors.text },
    page: {
        flex: 1,
    },
    tint: { backgroundColor: theme.colors.primary },
}))
