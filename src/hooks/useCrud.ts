import {useState} from "react";
import {useNotification} from "./useNotification.ts";
import {ApiError} from "../api/apiClient.ts";
import {MESSAGES} from "../utils/constants.ts";

//Interface Api
interface UseCrudOptions<T extends { id: number }> {
    getAll?: () => Promise<T[]>;
    getById?: (id: number) => Promise<T>;
    create?: (data: Omit<T, 'id'>) => Promise<T>;
    update?: (id: number, data: Partial<T>) => Promise<T>;
    delete?: (id: number) => Promise<void>;
}

export const useCrud = <T extends { id: number }>(options: UseCrudOptions<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { success, error: showError } = useNotification();

    //Universal error handling function
    const handleError = (err: unknown, defaultMessage: string) => {
        let errorMessage = defaultMessage;

        if (err instanceof ApiError) {
            errorMessage = err.message;
        } else if (err instanceof Error){
            errorMessage = err.message;
        }

        setError(errorMessage);
        showError(errorMessage);
    }

    //Retrieves all items from the API and saves them to local state
    const fetchAll = async () => {
        if (!options.getAll) return;

        setLoading(true);
        setError(null);

        try {
            const result = await options.getAll();
            setData(result);
        } catch (err) {
            handleError(err, MESSAGES.ERROR.FETCH_FAILED);
        } finally {
            setLoading(false);
        }
    }

    //Create user
    const createItem = async (itemData: any) => {
        if (!options.create) return;

        setLoading(true);
        setError(null);

        try{
            const newItem = await options.create(itemData);
            setData((prev) => [...prev, newItem]);
            success(MESSAGES.SUCCESS.USER_CREATED);
            return newItem;
        } catch (err) {
            handleError(err, MESSAGES.ERROR.CREATE_FAILED);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    //Uodate user
    const updateItem = async (id: number, itemData: any) => {
        if (!options.update) return;

        setLoading(true);
        setError(null);

        try{
            const updatedItem = await options.update(id, itemData);
            setData((prev) =>
                prev.map((item: any) => (item.id === id ? updatedItem : item))
            );
            success(MESSAGES.SUCCESS.USER_UPDATED);
            return updatedItem;
        } catch (err) {
            handleError(err, MESSAGES.ERROR.UPDATE_FAILED);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    //Delete user
    const deleteItem = async (id: number) => {
        if (!options.delete) return;

        setLoading(true);
        setError(null);

        try{
            await options.delete(id);
            setData((prev) => prev.filter((item: any) => item.id !== id));
            success(MESSAGES.SUCCESS.USER_DELETED);
        } catch (err) {
            handleError(err, MESSAGES.ERROR.CREATE_FAILED);
            throw err;
        } finally {
            setLoading(false);
        }
    }


    return {data, loading, error, fetchAll, createItem, updateItem, deleteItem}
}