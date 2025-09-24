import { FC, useState } from 'react';
import styles from './RegistrationPage2.module.css';
import { DatePickerComponent } from '../../components/calendar';
import GreenButton from '../../components/buttons/GreenButton';
import { useDispatch, useSelector } from '../../services/store/store';
import { Input } from '../../components/input/Input';
import iconCalendar from '../../components/app/assets/static/iconsUi/calendar.svg';
import iconPlus from '../../components/app/assets/static/iconsUi/add.svg';
import iconUserInfo from '../../components/app/assets/static/images/userInfo.svg';
{
  /*
import { CustomSelect } from '@/shared/ui/customSelect/customSelect';
import { Autocomplete } from '@/shared/ui/autoComplete/autoComplete';
import { MultiSelect } from '@/shared/ui/multiSelect/multiSelect';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { russianCities } from '@/shared/lib/cities';
import {
  resetStepTwoData,
  TStepTwoData,
  updateStepTwoData
} from '@/services/slices/registrationSlice';
import { RegistrationInfoPanel } from '@/shared/ui/registrationInfoPanel/registrationInfoPanel';
import { stepActions } from '@/services/slices/stepSlice';
import {
  getCategoriesSelector,
  getSubcategoriesByCategory
} from '@/services/slices/skillsSlice';
  */
}

export const RegisterStepSecond: FC = () => {
  const dispatch = useDispatch();
  const defaultValues = useSelector((state) => state.register.stepTwoData);
  const genders = ['Мужской', 'Женский'] as const;
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
    control,
    trigger,
    setError,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: { ...defaultValues }
  });
  const selectedCategories = watch('categories') || '';
  const subcategoryOptions = useSelector(state);

  const onSubmit = () => {};
  const handleBack = () => {};

  return (
    <div className={styles.registrationContainer}>
      <form
        className={styles.registrationForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name='avatar'
          control={control}
          render={({ fieldState }) => (
            <div className={styles.logoContainer}>
              <label htmlFor='avatar' className={styles.avatarLabel}>
                <img className={styles.avatarLabelPlusIcon} src={plusIcon} />
              </label>
              <input
                id='avatar'
                type='file'
                accept='image/*'
                className={styles.avatarInput}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      const base64 = reader.result as string;
                      setValue('avatar', base64, { shouldValidate: true });
                    };
                  }
                }}
                onBlur={() => trigger('avatar')}
              />
              {fieldState.error && (
                <p className={styles.errorText}>{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
        <Input
          {...register('name')}
          id='name'
          title='Имя'
          placeholder='Введите ваше имя'
          className={styles.elementFull}
          error={errors.name?.message}
          onFocus={() => clearErrors('name')}
          onBlur={() => trigger('name')}
        />
        <Controller
          name='birthdate'
          control={control}
          render={({ field }) => {
            const value = field.value ?? '';
            function setDatePicker(arg0: boolean) {
              throw new Error('Function not implemented.');
            }

            function setSelectedDate(date: Date | undefined) {
              throw new Error('Function not implemented.');
            }

            return (
              <div className={styles.datePickerWrapper}>
                <TextInput
                  {...field}
                  type='text'
                  id='date'
                  title='Дата рождения'
                  placeholder='дд.мм.гггг'
                  icon={calendarIcon}
                  onClick={() => setDatePicker(true)}
                  value={value}
                  className={styles.fixedHeight}
                  error={errors.birthdate?.message}
                  hideError={isDatePickerOpen}
                />

                {isDatePickerOpen && (
                  <CustomDatePicker
                    selected={selectedDate}
                    onSelect={(date?: Date) => {
                      setSelectedDate(date);
                    }}
                    onCancelClick={() => {
                      setDatePicker(false);
                      setSelectedDate(undefined);
                      field.onChange('');
                      clearErrors('birthdate');
                    }}
                    onChooseClick={() => {
                      setDatePicker(false);
                      if (selectedDate) {
                        const formatted =
                          selectedDate.toLocaleDateString('ru-RU');
                        field.onChange(formatted);
                        trigger('birthdate');
                      }
                    }}
                    onClose={() => {
                      setDatePicker(false);
                      trigger('birthdate');
                    }}
                    className={styles.datePickerPosition}
                    disabled={{ after: new Date() }}
                  />
                )}
              </div>
            );
          }}
        />
        <Controller
          name='gender'
          control={control}
          render={({ field }) => (
            <CustomSelect
              {...field}
              options={[
                { value: 'Не указан', label: 'Не указан' },
                { value: 'Мужской', label: 'Мужской' },
                { value: 'Женский', label: 'Женский' }
              ]}
              className={styles.fixedHeight}
              id='gender'
              title='Пол'
              placeholder='Не указан'
              error={errors.gender?.message}
              onFocus={() => clearErrors('gender')}
            />
          )}
        />
        <Controller
          name='city'
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              className={styles.elementFull}
              id='city'
              title='Город'
              placeholder='Не указан'
              suggestions={russianCities}
              error={errors.city?.message || ''}
              onFocus={() => clearErrors('city')}
            />
          )}
        />
        <Controller
          name='categories'
          control={control}
          render={({ field }) => (
            <MultiSelect
              {...field}
              className={styles.elementFull}
              options={skills}
              title='Категория навыка, которому хотите научиться'
              id='skill'
              placeholder='Выберите категорию'
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                trigger('categories');
              }}
              error={errors.categories?.message}
              onFocus={() => clearErrors('categories')}
            />
          )}
        />
        <Controller
          name='subcategories'
          control={control}
          render={({ field }) => (
            <MultiSelect
              {...field}
              className={styles.elementFull}
              options={subcategoryOptions}
              title='Подкатегория навыка, которому хотите научиться'
              id='subSkill'
              placeholder='Выберите подкатегорию'
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                trigger('subcategories');
              }}
              error={errors.subcategories?.message}
              onFocus={() => {
                if (subcategoryOptions.length === 0) {
                  setError('subcategories', {
                    type: 'manual',
                    message: 'Сначала выберите хотя бы одну категорию'
                  });
                } else {
                  clearErrors('subcategories');
                }
              }}
            />
          )}
        />
        <div className={styles.buttonContainer}>
          <GreenButton type='quaternary' onClick={handleBack}>
            Назад
          </GreenButton>
          <GreenButton type='primary' onClick={handleSubmit(onSubmit)}>
            Продолжить
          </GreenButton>
        </div>
      </form>
      <RegistrationInfoPanel
        headerText='Расскажите немного о себе'
        icon={userIcon}
        text='Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена'
      />
    </div>
  );
};
function useForm(arg0: { resolver: any; mode: string; defaultValues: any; }): { register: any; handleSubmit: any; formState: { errors: any; }; clearErrors: any; watch: any; control: any; trigger: any; setError: any; setValue: any; } {
  throw new Error('Function not implemented.');
}

function yupResolver(schema: any) {
  throw new Error('Function not implemented.');
}

function getCategoriesSelector(state: any): unknown {
  throw new Error('Function not implemented.');
}

function state(state: any): unknown {
  throw new Error('Function not implemented.');
}

