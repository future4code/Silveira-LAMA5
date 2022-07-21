export class Shows {
    constructor(
        private id: string,
        private week_day: string,
        private start_time: number,
        private end_time: number,
        private band_id: string
    ){}

    getId(){
        return this.id
    }

    getWeekDay(){
        return this.week_day
    }

    getStartTime(){
        return this.start_time
    }

    getEndTime(){
        return this.end_time
    }

    getBandId(){
        return this.band_id
    }


    setId(id: string){
        this.id = id
    }

    setWeekDay(week_day: string){
        this.week_day = week_day
    }

    setStartTime(start_time: number){
        this.start_time = start_time
    }

    setEndTime(end_time: number){
        this.end_time = end_time;
    }

    setBandId(band_id: string){
        this.band_id = band_id
    }

    
    static toShowsModel(shows: any): Shows {
        return new Shows(
            shows.id,
            shows.week_day,
            shows.start_time,
            shows.end_time,
            shows.band_id
        );
    }
}

export interface ShowsInputDTO{
    week_day: string
    start_time: number
    end_time: number
    band_id: string
}