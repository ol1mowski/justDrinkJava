import { memo } from 'react'
import { Button } from '../../../components/ui/Button/Button.component'
import { CogIcon, LanguageIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export const PreferencesSection = memo(() => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <CogIcon className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Preferencje</h2>
          <p className="text-sm text-gray-600">Dostosuj swoje ustawienia aplikacji</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Wybór języka */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <LanguageIcon className="w-4 h-4" />
              Język
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="language"
                  value="pl"
                  defaultChecked
                  className="w-4 h-4 text-java-orange focus:ring-java-orange"
                />
                <span className="text-sm font-medium">Polski</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="language"
                  value="en"
                  className="w-4 h-4 text-java-orange focus:ring-java-orange"
                />
                <span className="text-sm font-medium">English</span>
              </label>
            </div>
          </div>

          {/* Wybór trybu */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <SunIcon className="w-4 h-4" />
              Tryb wyświetlania
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  defaultChecked
                  className="w-4 h-4 text-java-orange focus:ring-java-orange"
                />
                <SunIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Jasny</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  className="w-4 h-4 text-java-orange focus:ring-java-orange"
                />
                <MoonIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Ciemny</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="theme"
                  value="auto"
                  className="w-4 h-4 text-java-orange focus:ring-java-orange"
                />
                <CogIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Automatyczny</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="primary">
            Zapisz preferencje
          </Button>
        </div>
      </div>
    </div>
  )
})

PreferencesSection.displayName = 'PreferencesSection' 