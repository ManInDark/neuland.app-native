import { type AvailableRoomItem } from '@/types/thi-api'
import { getAvailableRooms } from '@/utils/library-utils'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { StyleSheet, createUnistylesComponent } from 'react-native-unistyles'
import { Picker, useBinding } from 'swiftui-react-native'

import BookButton from './BookingButton'
import BookingFrame from './BookingFrame'

const StyledPicker = createUnistylesComponent(Picker, (theme) => ({
    pickerStyle: 'wheel' as 'wheel',
    tint: theme.colors.primary,
    scaleEffect: 0.9,
}))
const LibraryBookingView = ({
    item,
    addReservation,
}: {
    item: AvailableRoomItem
    addReservation: (
        reservationRoom: string,
        reservationTime: { from: Date; to: Date },
        reservationSeat: string
    ) => Promise<void>
}): JSX.Element => {
    const rooms = getAvailableRooms(item)
    const uniqueRoomNames = [...new Set(rooms.map((item) => item[1].room_name))]
    const [seats, setSeats] = useState<string[]>([])
    const roomBindung = useBinding(uniqueRoomNames[0])
    const seatBindung = useBinding(
        Array.isArray(rooms?.[0]?.[1]?.seats) ? rooms[0][1].seats[0] : ''
    )
    useEffect(() => {
        // get the key of the room by reverse lookup in uniqueRoomNames
        const room =
            Object.keys(item.resources)?.find((key) =>
                item.resources[key].room_name.includes(roomBindung.value)
            ) ?? ''
        const seatsArray =
            item.resources[room]?.seats != null
                ? Object.values(item.resources[room].seats).map((seat) => seat)
                : []
        setSeats(seatsArray)
        // if the new room has not the selected seat available, select the first seat
        if (!seatsArray.includes(seatBindung.value)) {
            seatBindung.value = seatsArray[0]
        }
    }, [roomBindung.value])

    return (
        <>
            <BookingFrame item={item}>
                <View style={styles.dropdownContainer}>
                    <StyledPicker
                        selection={roomBindung}
                        style={styles.locationPicker}
                        lineLimit={1}
                    >
                        {uniqueRoomNames.map((option) => (
                            <Text key={option}>{option}</Text>
                        ))}
                    </StyledPicker>
                    <StyledPicker
                        selection={seatBindung}
                        style={styles.seatPicker}
                    >
                        {seats.map((option) => (
                            <Text key={option}>{option}</Text>
                        ))}
                    </StyledPicker>
                </View>
            </BookingFrame>
            <View style={styles.buttonContainer}>
                <BookButton
                    addReservation={addReservation}
                    item={item}
                    room={roomBindung.value}
                    seat={seatBindung.value}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create((theme) => ({
    buttonContainer: {
        paddingTop: 8,
    },
    dropdownContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 12,
        width: '100%',
    },
    locationPicker: {
        width: '75%',
    },
    seatPicker: {
        width: '25%',
    },
}))

export default LibraryBookingView
