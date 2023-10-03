import React from 'react';
import { Form, Input, Checkbox, Button, Select } from 'antd';

import { COUNTRIES } from '~/lib';
import clsx from 'clsx';

const { Option } = Select;

interface SwagFormState {
	firstName: string;
	lastName: string;
	email: string;
	phone: number;
	address: string;
	terms: boolean;
	prefix: number;
}

// Fonts
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 10 },
	},
};

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 64,
			offset: 8,
		},
	},
};

const SwagForm = () => {
	const [form] = Form.useForm<SwagFormState>();
	const onFinish = (values: SwagFormState) => {
		console.log('Received values of form: ', values);
	};

	const countryCodeSelector = (
		<Form.Item name='prefix' noStyle>
			<Select style={{ width: 96 }} showSearch>
				{COUNTRIES.map((country) => (
					<Option key={country.code} value={country.mobileCode.slice(1)}>
						{country.mobileCode}
					</Option>
				))}
			</Select>
		</Form.Item>
	);

	return (
		<div className={clsx(inter.className, ' flex w-full flex-col items-center')}>
			<div className='mb-8 text-2xl font-bold'>Delivery Details</div>
			<Form
				{...formItemLayout}
				layout='horizontal'
				form={form}
				name='register'
				onFinish={onFinish}
				scrollToFirstError
				className='w-full max-w-xl sm:-translate-x-16'
			>
				<Form.Item
					name='firstName'
					label='First Name'
					rules={[{ required: true, message: 'First name required' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='lastName'
					label='Last Name'
					rules={[{ required: true, message: 'Last name required' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name='email'
					label='E-mail'
					rules={[
						{
							type: 'email',
							message: 'Not a valid E-mail',
						},
						{
							required: true,
							message: 'E-Mail required',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name='phone'
					label='Phone Number'
					rules={[
						{ required: true, message: 'Phone number required' },
						{
							pattern: new RegExp(
								'^(\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{1,3})[- .]?\\d{3,4}[- .]?\\d{4}$'
							),
							message: 'Please input a valid phone number!',
						},
					]}
				>
					<Input addonBefore={countryCodeSelector} style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item
					name='address'
					label='Address'
					rules={[{ required: true, message: 'Address required' }]}
				>
					<Input.TextArea showCount maxLength={100} />
				</Form.Item>
				<Form.Item
					name='terms'
					valuePropName='checked'
					rules={[
						{
							validator: (_, value) =>
								value
									? Promise.resolve()
									: Promise.reject(new Error('Should accept terms and conditions')),
						},
					]}
					{...tailFormItemLayout}
				>
					<Checkbox>
						I have read the <a href=''>terms and conditions</a>
					</Checkbox>
				</Form.Item>
				<Form.Item {...tailFormItemLayout} className='flex justify-end'>
					<Button
						type='primary'
						htmlType='submit'
						className='bg-blue-500'
						size='large'
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default SwagForm;
