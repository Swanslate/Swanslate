import axios from "axios";
import { ITasks } from "../entities/IContext";

export async function getTranslateTasks() {
    const randomIndexTranslate = Math.floor(Math.random() * 600);
    const randomIndexValidate = Math.floor(Math.random() * 35);

    const response: { data: { data: ITasks; }; } = await axios.get(
        `https://swanslate-nextjs.vercel.app/api/translateTasks`
    );
    if (response?.data) {
        const { data } = response.data;
        data.translateTasks = data.translateTasks.slice(randomIndexTranslate);
        data.translateTasks.push(...response.data.data.translateTasks.slice(0, randomIndexTranslate - 1))
        data.translateTasks = data.translateTasks.map((task, i) => ({ ...task, id: i }));

        data.validationTasks = data.validationTasks.slice(randomIndexValidate);
        data.validationTasks.push(...response.data.data.validationTasks.slice(0, randomIndexValidate - 1))
        data.validationTasks = data.validationTasks.map((task, i) => ({ ...task, id: i }));

        return data;
    }

}
