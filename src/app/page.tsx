"use client";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import api from "../lib/api";
import type { MoodEntry } from "../types";
import { useRouter } from "next/navigation";

function Entries() {
  const { username, logout, token } = useAuth();
  const router = useRouter();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ moodLevel: 5, memo: "" });

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }
    (async () => {
      try {
        const res = await api.get<MoodEntry[]>("/api/entries");
        setEntries(res.data);
      } catch {
        setErr("一覧の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    })();
  }, [token, router]);

  async function createEntry(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post("/api/entries", {
        moodLevel: Number(form.moodLevel),
        memo: form.memo || null,
      });
      const res = await api.get<MoodEntry[]>("/api/entries");
      setEntries(res.data);
      setForm({ moodLevel: 5, memo: "" });
    } catch {
      setErr("作成に失敗しました");
    }
  }

  async function remove(id: number) {
    try {
      await api.delete(`/api/entries/${id}`);
      setEntries((prev) => prev.filter((x) => x.id !== id));
    } catch {
      setErr("削除に失敗しました");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div>
          <h1 className="text-lg font-semibold">Emotion Journal</h1>
          <p className="text-sm text-gray-500">ログイン中: {username}</p>
        </div>
        <button
          onClick={logout}
          className="px-3 py-1 rounded bg-gray-800 text-white"
        >
          ログアウト
        </button>
      </header>

      <main className="max-w-3xl mx-auto p-6 space-y-8">
        <form
          onSubmit={createEntry}
          className="bg-white p-4 rounded-2xl shadow space-y-3"
        >
          <h2 className="font-semibold">新規エントリ</h2>
          <label className="block text-sm">気分（1〜10）</label>
          <input
            type="number"
            min={1}
            max={10}
            value={form.moodLevel}
            onChange={(e) =>
              setForm({ ...form, moodLevel: Number(e.target.value) })
            }
            className="border rounded px-3 py-2 w-32"
          />
          <label className="block text-sm mt-2">メモ（任意）</label>
          <textarea
            value={form.memo}
            onChange={(e) => setForm({ ...form, memo: e.target.value })}
            className="border rounded px-3 py-2 w-full"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            追加
          </button>
        </form>

        <section className="bg-white p-4 rounded-2xl shadow">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">エントリ一覧</h2>
            {/* 省略: 手動リロードボタンなど */}
          </div>
          {loading ? (
            <p className="text-gray-500 mt-3">読み込み中...</p>
          ) : err ? (
            <p className="text-red-600 mt-3">{err}</p>
          ) : entries.length === 0 ? (
            <p className="text-gray-500 mt-3">まだエントリがありません。</p>
          ) : (
            <ul className="divide-y mt-3">
              {entries.map((e) => (
                <li
                  key={e.id}
                  className="py-3 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">気分: {e.moodLevel}</p>
                    <p className="text-sm text-gray-600">
                      {e.memo ?? "-"} ・{" "}
                      {new Date(e.entryDate).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(e.id)}
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    削除
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <Entries />
    </AuthProvider>
  );
}
