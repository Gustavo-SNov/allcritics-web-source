'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User } from '@/types/User';
import { userService } from '@/services/userService';

interface ProfileEditDialogProps {
  userProfile: User | null;
  onUpdate: (updated: User) => Promise<void> | void;
  children?: React.ReactNode;
}

type FormState = {
  username: string;
  email: string;
  accountName: string;
  biography: string;
  profileImgUrl: string;
  coverImgUrl: string;
};

const emptyForm = (): FormState => ({
  username: '',
  email: '',
  accountName: '',
  biography: '',
  profileImgUrl: '',
  coverImgUrl: ''
});

export default function ProfileEditDialog({ userProfile, onUpdate, children }: ProfileEditDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [loading, setLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile) {
      setForm({
        username: userProfile.username ?? '',
        email: userProfile.email ?? '',
        accountName: userProfile.accountName ?? '',
        biography: userProfile.biography ?? '',
        profileImgUrl: userProfile.profileImgUrl ?? '',
        coverImgUrl: userProfile.coverImgUrl ?? ''
      });
      setProfilePreview(userProfile.profileImgUrl ?? null);
      setCoverPreview(userProfile.coverImgUrl ?? null);
    } else {
      setForm(emptyForm());
      setProfilePreview(null);
      setCoverPreview(null);
    }
    setError(null);
  }, [userProfile, open]);

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((s) => ({ ...s, [field]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in form) {
      setField(name as keyof FormState, value as string);
      if (name === 'profileImgUrl') setProfilePreview(value);
      if (name === 'coverImgUrl') setCoverPreview(value);
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setField('biography', e.target.value);
  };

  const validate = (): boolean => {
    if (!form.username.trim()) {
      setError('Username não pode ficar vazio');
      return false;
    }
    if (!form.email.trim()) {
      setError('Email não pode ficar vazio');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Email inválido');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userProfile) return;
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      const payload: Partial<User> = {
        username: form.username,
        email: form.email,
        accountName: form.accountName,
        biography: form.biography,
        profileImgUrl: form.profileImgUrl,
        coverImgUrl: form.coverImgUrl
      };

      const updatedUser = await userService.updateUser(userProfile.idUser, payload);

      await Promise.resolve(onUpdate(updatedUser));

      setOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Erro ao atualizar usuário:', err);
      const message = err?.response?.data?.message || err?.message || 'Erro desconhecido ao atualizar';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            Edit Profile
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-2">
              <label className="block text-sm">Profile image URL</label>
              <div className="flex gap-2">
                <Input
                  name="profileImgUrl"
                  value={form.profileImgUrl}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <label className="block text-sm">Cover image URL</label>
              <div className="flex gap-2">
                <Input
                  name="coverImgUrl"
                  value={form.coverImgUrl}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <Input value={form.accountName} onChange={(e) => setField('accountName', e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-1">Username</label>
              <Input value={form.username} onChange={(e) => setField('username', e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <Input value={form.email} onChange={(e) => setField('email', e.target.value)} type="email" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Biography</label>
              <textarea
                value={form.biography}
                onChange={handleTextAreaChange}
                rows={4}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)} type="button" disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
