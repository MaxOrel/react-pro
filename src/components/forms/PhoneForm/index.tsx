import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { User, useCreatePhoneMutation } from 'app/store/api/phoneApi';
import * as yup from 'yup';

type PhoneFormValues = Omit<User, 'id'>;

const phoneFormSchema: yup.ObjectSchema<PhoneFormValues> = yup.object({
	name: yup.string().min(3).required(),
	middleName: yup.string().min(3).required(),
	lastName: yup.string().min(3).required(),
	phone: yup
		.string()
		.matches(/(?:\+|\d)[\d\-() ]{9,}\d/gi, 'Invalid phone number')
		.required(),
});

export const PhoneForm: FC = () => {
	const [createPhone] = useCreatePhoneMutation();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<PhoneFormValues>({
		defaultValues: {
			name: '',
			middleName: '',
			lastName: '',
			phone: '',
		},
		resolver: yupResolver(phoneFormSchema),
	});

	const submitHandler: SubmitHandler<PhoneFormValues> = async (values) => {
		try {
			// метод "unwrap" помогает убрать вспомогательные обертки
			// RTK Query, которые обрабатывают ошибки. Теперь ошибки обрабатываем мы
			// с помощью конструкции try...catch. В этом случае нам так удобней
			await createPhone(values).unwrap();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		/* "handleSubmit" произведет валидацию перед вызовом submitHandler */
		<form onSubmit={handleSubmit(submitHandler)}>
			{/* с помощью register связываем html-элемент input с react-hook-form */}
			<input placeholder='Имя' {...register('name')} />
			{errors.name && <span>{errors.name.message}</span>}

			{/* с помощью register связываем html-элемент input с react-hook-form */}
			<input placeholder='Отчество' {...register('middleName')} />
			{errors.middleName && <span>{errors.middleName.message}</span>}

			{/* с помощью register связываем html-элемент input с react-hook-form */}
			<input placeholder='Фамилия' {...register('lastName')} />
			{errors.lastName && <span>{errors.lastName.message}</span>}

			{/* с помощью register связываем html-элемент input с react-hook-form */}
			<input placeholder='Телефон' {...register('phone')} />
			{errors.phone && <span>{errors.phone.message}</span>}

			<input
				type='submit'
				disabled={!isSubmitted && (isSubmitting || !isValid)}
			/>
		</form>
	);
};
