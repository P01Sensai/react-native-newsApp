import newsCategoryList from "@/constants/Categories";
import { useCallback, useState } from "react";

export const useNewsCategories = () => {
    const [newscategories, setNewsCategories] = useState(newsCategoryList);
    const toggleNewsCategory = useCallback( (id: number) => {
        setNewsCategories((prevNewsCategpries) => {

            return prevNewsCategpries.map((item) => {
                if(item.id === id) {
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
        newscategories,
        toggleNewsCategory,
    }
}