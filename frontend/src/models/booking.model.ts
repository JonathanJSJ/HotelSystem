export interface BookingPostRequestDto {
  client_first_name: string;
  client_last_name: string;
  client_phone_number: string;
  start_date: Date;
  end_date: Date;
  room_id: string;
}

export interface UserBookingResponseDto {
  id: string;
  hotel_name: string;
  start_date: Date;
  end_date: Date;
}
