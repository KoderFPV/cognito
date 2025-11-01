import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { getTranslations } from 'next-intl/server';
import { connectToMongo } from '@/clients/mongodb/mongodb';
import {
  createUserAccount,
  registrationSchema
} from '@/services/registration/registration.service';
import { getLocaleFromRequest } from '@/services/locale/locale.service';
import { initZodI18n } from '@/services/validation/validation.service';

export const POST = async (request: NextRequest) => {
  const locale = getLocaleFromRequest(request);
  const t = await getTranslations({ locale, namespace: 'api.registration' });

  try {
    const body = await request.json();

    await initZodI18n(locale);
    const validatedData = registrationSchema.parse(body);

    const db = await connectToMongo();
    const user = await createUserAccount(db, validatedData);

    return NextResponse.json(
      {
        message: t('success'),
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: t('validationFailed'),
          details: error.errors,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      if (error.message.includes('already exists')) {
        return NextResponse.json(
          { error: t('userExists') },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: t('registrationFailed') },
      { status: 500 }
    );
  }
};
