import { ZodError, ZodIssue } from 'zod'

const formatZodIssue = (issue: ZodIssue): string => {
    const { path, message } = issue;
    const pathString = path.join('.');

    return `${pathString}: ${message}`;
}

export const formatZodError = (error: ZodError): any => {
    const { issues } = error;

    const errors = issues.map(issue => {
      return formatZodIssue(issue);
    });

    return errors;
}
