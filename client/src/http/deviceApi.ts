import { AxiosError } from 'axios';
import { IBrand, IType } from '../interfaces/interfaceDevices';
import { BrandSlice } from '../store/reducers/Devices/BrandSlice';
import { DeviceSlice } from '../store/reducers/Devices/DevicesSlice';
import { TypeSlice } from '../store/reducers/Devices/TypeSlice';
import { ErrorSlice } from '../store/reducers/error';
import { AppDispatch } from '../store/store';
import { $authHost, $host } from './index';

export const createType = (type: IType) => async (dispatch: AppDispatch) => {
  try {
    dispatch(TypeSlice.actions.TypeFetching(true));
    const data = await $authHost.post('api/type', type);
    return data;
  } catch (e) {
    const err = e as AxiosError;
    dispatch(ErrorSlice.actions.FetchingError(err.message));
  } finally {
    dispatch(TypeSlice.actions.TypeFetching(false));
  }
};

export const getTypes = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await $host.get('api/type');
    dispatch(TypeSlice.actions.TypeFetching(true));
    dispatch(TypeSlice.actions.TypeFethingSuccess(data));
  } catch (e) {
    const err = e as AxiosError;
    dispatch(ErrorSlice.actions.FetchingError(err.message));
  } finally {
    dispatch(TypeSlice.actions.TypeFetching(false));
  }
};

export const createBrand = (brand: IBrand) => async (dispatch: AppDispatch) => {
  try {
    dispatch(BrandSlice.actions.BrandFetching(true));
    const data = await $authHost.post('api/brand', brand);
    return data;
  } catch (e) {
    const err = e as AxiosError;
    dispatch(ErrorSlice.actions.FetchingError(err.message));
  } finally {
    dispatch(BrandSlice.actions.BrandFetching(false));
  }
};

export const getBrands = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await $host.get('api/brand');
    dispatch(BrandSlice.actions.BrandFetching(true));
    dispatch(BrandSlice.actions.BrandFethingSuccess(data));
  } catch (e) {
    const err = e as AxiosError;
    dispatch(ErrorSlice.actions.FetchingError(err.message));
  } finally {
    dispatch(BrandSlice.actions.BrandFetching(false));
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createDevice = async (device: any) => {
  const { data } = await $authHost.post('api/device', device);
  return data;
};

export const getDevices =
  (typeId: number | null, brandId: number | null, page: number, limit: number) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await $host.get('api/device', {
        params: {
          typeId,
          brandId,
          page,
          limit,
        },
      });
      dispatch(DeviceSlice.actions.DeviceFetching(true));
      dispatch(DeviceSlice.actions.DevicesFethingSuccess(data.rows));
      dispatch(DeviceSlice.actions.GettotalCountDevice(data.count));
    } catch (e) {
      const err = e as AxiosError;
      dispatch(ErrorSlice.actions.FetchingError(err.message));
    } finally {
      dispatch(DeviceSlice.actions.DeviceFetching(false));
    }
  };

export const getDevice = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await $host.get(`api/device/${id}`);
    dispatch(DeviceSlice.actions.DeviceFetching(true));
    dispatch(DeviceSlice.actions.DeviceFethingSuccess(data));
  } catch (e) {
    const err = e as AxiosError;
    dispatch(ErrorSlice.actions.FetchingError(err.message));
  } finally {
    dispatch(DeviceSlice.actions.DeviceFetching(false));
  }
};
