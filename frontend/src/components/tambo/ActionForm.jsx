import { motion } from 'framer-motion';
import { useState } from 'react';

function normalizeTime(value) {
  if (!value) return '14:00';
  if (/^\d{2}:\d{2}$/.test(value)) return value;
  const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return '14:00';
  let hours = Number(match[1]);
  const minutes = match[2];
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return `${String(hours).padStart(2, '0')}:${minutes}`;
}

function normalizeDate(value) {
  if (!value) return '2026-02-08';
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return '2026-02-08';
}

export function ActionForm({ title, date, time, attendees = [] }) {
  const [meetingTitle, setMeetingTitle] = useState(title || 'Engineering Sync');
  const [meetingDate, setMeetingDate] = useState(normalizeDate(date));
  const [meetingTime, setMeetingTime] = useState(normalizeTime(time));
  const [meetingAttendees, setMeetingAttendees] = useState(attendees);
  const [newAttendee, setNewAttendee] = useState('');
  const [status, setStatus] = useState('');

  const handleAddAttendee = () => {
    if (!newAttendee.trim()) return;
    setMeetingAttendees((prev) => [...prev, newAttendee.trim()]);
    setNewAttendee('');
  };

  const handleCancel = () => {
    setMeetingTitle(title || 'Engineering Sync');
    setMeetingDate(date || '2026-02-08');
    setMeetingTime(time || '14:00');
    setMeetingAttendees(attendees);
    setNewAttendee('');
    setStatus('Cancelled changes.');
  };

  const handleCreate = () => {
    setStatus('Meeting created (demo).');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border border-white/10 bg-bg-secondary/70 p-5"
    >
      <h3 className="text-sm font-semibold text-text-primary">📅 {title}</h3>
      <div className="mt-4 space-y-3 text-sm">
        <div>
          <label className="text-xs uppercase text-text-muted">Title</label>
          <input
            value={meetingTitle}
            onChange={(event) => setMeetingTitle(event.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/95 px-3 py-2 text-bg-primary focus:border-accent-primary/60 focus:outline-none"
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase text-text-muted">Date</label>
            <input
              type="date"
              value={meetingDate}
              onChange={(event) => setMeetingDate(event.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/95 px-3 py-2 text-bg-primary focus:border-accent-primary/60 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase text-text-muted">Time</label>
            <input
              type="time"
              value={meetingTime}
              onChange={(event) => setMeetingTime(event.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/95 px-3 py-2 text-bg-primary focus:border-accent-primary/60 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs uppercase text-text-muted">Attendees</label>
          <div className="mt-1 space-y-2">
            {meetingAttendees.length === 0 && (
              <div className="rounded-lg border border-dashed border-white/15 bg-bg-tertiary/40 px-3 py-2 text-xs text-text-muted">
                No attendees yet.
              </div>
            )}
            {meetingAttendees.map((person) => (
              <div
                key={person}
                className="rounded-lg border border-white/10 bg-bg-tertiary/70 px-3 py-2 text-text-primary"
              >
                👤 {person}
              </div>
            ))}
            <div className="flex gap-2">
              <input
                value={newAttendee}
                onChange={(event) => setNewAttendee(event.target.value)}
                placeholder="Add attendee email or name"
                className="flex-1 rounded-lg border border-dashed border-white/20 bg-bg-tertiary/40 px-3 py-2 text-text-primary placeholder:text-text-muted focus:border-accent-primary/60 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddAttendee}
                className="rounded-lg border border-white/10 px-3 py-2 text-xs text-text-secondary"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      {status && <p className="mt-3 text-xs text-text-muted">{status}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-lg border border-white/10 px-4 py-2 text-xs text-text-secondary"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-lg bg-accent-primary px-4 py-2 text-xs font-semibold text-bg-primary"
        >
          Create Meeting
        </button>
      </div>
    </motion.div>
  );
}
