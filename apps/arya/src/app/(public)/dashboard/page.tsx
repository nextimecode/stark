import { Button } from '@/components/button'
import * as FileInput from '@/components/form/file-input'
import * as Input from '@/components/form/input'
import * as Select from '@/components/form/select'
import { Textarea } from '@/components/form/textarea'
import { ThemeSelector } from '@/components/theme-selector'
import { Bold, Italic, Link, List, ListOrdered, Mail } from 'lucide-react'
import { CountrySelect } from './country-select'
import { SettingsTabs } from './settings-tabs'

export default function Dashboard() {
  return (
    <>
      <ThemeSelector />
      <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
        Settings
      </h1>
      <SettingsTabs />
      <div className="mt-6 flex flex-col">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
              Personal info
            </h2>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Update your photo and personal details here.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" variant="primary" form="settings">
              Save
            </Button>
          </div>
        </div>
      </div>
      <form
        className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-200 dark:divide-zinc-800"
        id="settings"
      >
        <div className="lg:grid-cols-form grid gap-3">
          <label
            className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
            htmlFor="firstName"
          >
            Name
          </label>
          <div className="grid gap-6 lg:grid-cols-2">
            <Input.Root>
              <Input.Control
                id="firstName"
                name="firstName"
                defaultValue="Diego"
                type="text"
              />
            </Input.Root>
            <Input.Root>
              <Input.Control
                name="lastName"
                defaultValue="Fernandes"
                type="text"
              />
            </Input.Root>
          </div>
        </div>

        <div className="lg:grid-cols-form grid gap-3 pt-5">
          <label
            className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
            htmlFor="email"
          >
            Email address
          </label>
          <div className="flex gap-3">
            <Input.Root>
              <Input.Prefix>
                <Mail className="h-5 w-5 text-zinc-500" />
              </Input.Prefix>
              <Input.Control
                id="email"
                name="email"
                defaultValue="diego.schell.f@gmail.com"
                type="email"
              />
            </Input.Root>
          </div>
        </div>

        <div className="lg:grid-cols-form grid gap-3 pt-5">
          <label
            className="flex flex-col text-sm leading-relaxed font-medium text-zinc-700 dark:text-zinc-100"
            htmlFor="photo"
          >
            Your photo
            <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
              This will be displayed on your profile.
            </span>
          </label>
          <FileInput.Root
            className="flex flex-col items-start gap-5 lg:flex-row"
            id="photo"
          >
            <FileInput.ImagePreview />
            <FileInput.Trigger />
            <FileInput.Control accept="image/*" />
          </FileInput.Root>
        </div>

        <div className="lg:grid-cols-form grid gap-3 pt-5">
          <label
            className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
            htmlFor="role"
          >
            Role
          </label>
          <div className="flex gap-3">
            <Input.Root>
              <Input.Control
                id="role"
                name="role"
                defaultValue="Product Designer"
              />
            </Input.Root>
          </div>
        </div>

        <label className="lg:grid-cols-form grid gap-3 pt-5">
          <span className="flex flex-col text-sm leading-relaxed font-medium text-zinc-700 dark:text-zinc-100">
            Country
          </span>

          <CountrySelect />
        </label>

        <label className="lg:grid-cols-form grid gap-3 pt-5">
          <span className="flex flex-col text-sm leading-relaxed font-medium text-zinc-700 dark:text-zinc-100">
            Timezone
          </span>
          <Select.Root name="timezone">
            <Select.Trigger>
              <Select.Value placeholder="Select your timezone..." />
            </Select.Trigger>

            <Select.Content>
              <Select.Item value="utc-3">
                <Select.ItemText>
                  Pacific Standard Time (PST)
                  <span className="text-sm text-zinc-500">UTC 08:00</span>
                </Select.ItemText>
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </label>

        <div className="lg:grid-cols-form grid gap-3 pt-5">
          <label
            className="flex flex-col text-sm leading-relaxed font-medium text-zinc-700 dark:text-zinc-100"
            htmlFor="bio"
          >
            Bio
            <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
              Write a short introduction.
            </span>
          </label>
          <div className="flex flex-col gap-3">
            <div className="grid gap-3 lg:grid-cols-2">
              <Select.Root defaultValue="normal">
                <Select.Trigger>
                  <Select.Value />
                </Select.Trigger>

                <Select.Content>
                  <Select.Item value="normal">
                    <Select.ItemText>Normal text</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="md">
                    <Select.ItemText>Markdown</Select.ItemText>
                  </Select.Item>
                </Select.Content>
              </Select.Root>
              <div className="flex items-center gap-1">
                <Button variant="ghost">
                  <Bold className="h-4 w-4 text-zinc-400" strokeWidth={3} />
                </Button>
                <Button variant="ghost">
                  <Italic className="h-4 w-4 text-zinc-400" strokeWidth={3} />
                </Button>
                <Button variant="ghost">
                  <Link className="h-4 w-4 text-zinc-400" strokeWidth={3} />
                </Button>
                <Button variant="ghost">
                  <List className="h-4 w-4 text-zinc-400" strokeWidth={3} />
                </Button>
                <Button variant="ghost">
                  <ListOrdered
                    className="h-4 w-4 text-zinc-400"
                    strokeWidth={3}
                  />
                </Button>
              </div>
            </div>
            <Textarea
              id="bio"
              name="bio"
              defaultValue="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development."
            />
          </div>
        </div>

        <div className="lg:grid-cols-form grid gap-3 pt-5">
          <label
            className="flex flex-col text-sm leading-relaxed font-medium text-zinc-700 dark:text-zinc-100"
            htmlFor="projects"
          >
            Portfolio projects
            <span className="text-sm font-normal text-zinc-500">
              Share a few snippets of your work.
            </span>
          </label>
          <FileInput.Root id="projects" multiple>
            <FileInput.Trigger />
            <FileInput.FileList />
            <FileInput.Control />
          </FileInput.Root>
        </div>

        <div className="flex items-center justify-end gap-2 pt-5">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="primary" form="settings">
            Save
          </Button>
        </div>
      </form>
    </>
  )
}
