import CountryList from "@/constants/CountryList";
import { useCallback, useState } from "react";

export const useNewsCountry = () => {
    const [newscountry, setNewsCountry] = useState(CountryList);
    const toggleNewsCountry = useCallback( (id: number) => {
        setNewsCountry((prevNewsCountry) => {

            return prevNewsCountry.map((item, index) => {
                if(index === id) {
                    return {
                        ...item,
                        selected: !item.selected  //it will set true to false and vice-versa
                    }
                }
                return item;
            })
        });
    }, []);
    return {
        newscountry,
        toggleNewsCountry,
    }
}