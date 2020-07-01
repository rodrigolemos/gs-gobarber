import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: 'teste',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('teste');
  });

  it('should not be able to create two appointments at same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'teste',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
