import PlatformIcon from '@/components/Universal/Icon'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'
import {
    StyleSheet,
    UnistylesRuntime,
    createUnistylesComponent,
} from 'react-native-unistyles'

const DefaultTabs = (): JSX.Element => {
    const { t } = useTranslation('navigation')
    console.log('DefaultTabs', UnistylesRuntime.themeName)
    const BlurTab = ({ tint }: { tint: 'light' | 'dark' }) => (
        <BlurView tint={tint} intensity={75} style={styles.blurTab} />
    )

    const StyledBlurTab = createUnistylesComponent(BlurTab, (theme) => ({
        tint:
            theme.colors.background === 'rgb(1, 1, 1)'
                ? ('dark' as 'dark')
                : ('light' as 'light'),
    }))

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: styles.tint.color,
                    tabBarLabelStyle: {
                        marginBottom: 2,
                    },
                }}
            >
                <Tabs.Screen
                    name="(index)"
                    options={{
                        title: 'Home',
                        headerShown: false,

                        tabBarIcon: ({ color, size }) => (
                            <PlatformIcon
                                ios={{
                                    name: 'house',
                                    variant: 'fill',
                                    size: size - 4,
                                }}
                                android={{
                                    name: 'home',
                                    size,
                                }}
                                style={{
                                    color,
                                }}
                            />
                        ),

                        tabBarStyle: styles.tabbarStyle(true),
                        tabBarBackground: () =>
                            Platform.OS === 'ios' ? <StyledBlurTab /> : null,
                    }}
                />

                <Tabs.Screen
                    name="(timetable)"
                    options={{
                        headerShown: false,
                        title: t('navigation.timetable'),
                        tabBarIcon: ({ color, size }) => (
                            <PlatformIcon
                                ios={{
                                    name: 'clock',
                                    variant: 'fill',
                                    size: size - 4,
                                }}
                                android={{
                                    name: 'calendar_month',
                                    size,
                                }}
                                style={{
                                    color,
                                }}
                            />
                        ),
                        tabBarStyle: styles.tabbarStyle(true),
                        tabBarBackground: () =>
                            Platform.OS === 'ios' ? <BlurTab /> : null,
                    }}
                />

                <Tabs.Screen
                    name="map"
                    options={{
                        title: t('navigation.map'),
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <PlatformIcon
                                ios={{
                                    name: 'map',
                                    variant: 'fill',
                                    size: size - 4,
                                }}
                                android={{
                                    name: 'map',
                                    size,
                                }}
                                style={{
                                    color,
                                }}
                            />
                        ),
                        tabBarStyle: styles.tabbarStyle(false),
                    }}
                />

                <Tabs.Screen
                    name="(food)"
                    options={{
                        title: t('navigation.food'),
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <PlatformIcon
                                ios={{
                                    name: 'fork.knife',
                                    size: size - 4,
                                }}
                                android={{
                                    name: 'restaurant',
                                    size,
                                }}
                                style={{
                                    color,
                                }}
                            />
                        ),

                        tabBarStyle: styles.tabbarStyle(true),
                        tabBarBackground: () =>
                            Platform.OS === 'ios' ? <BlurTab /> : null,
                    }}
                />
            </Tabs>
        </>
    )
}

const styles = StyleSheet.create((theme) => ({
    blurTab: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    tint: {
        color: theme.colors.primary,
    },
    tabbarStyle: (blur: boolean) => ({
        borderTopColor: theme.colors.border,
        backgroundColor: blur
            ? Platform.OS === 'ios'
                ? undefined
                : theme.colors.card
            : theme.colors.card,
    }),
}))

export default DefaultTabs
