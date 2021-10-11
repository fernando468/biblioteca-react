export const validateFormValues = (schema) => async (values) => {
  if (typeof schema === 'function') {
    schema = schema();
  }
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (err) {
    const errors = err.inner.reduce((formError, innerError) => {
      return { ...formError, [innerError.path]: innerError.message };
    }, {});

    return errors;
  }
};
