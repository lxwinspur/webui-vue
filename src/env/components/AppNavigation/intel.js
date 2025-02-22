import IconDashboard from '@carbon/icons-vue/es/dashboard/16';
import IconTextLinkAnalysis from '@carbon/icons-vue/es/text-link--analysis/16';
import IconDataCheck from '@carbon/icons-vue/es/data--check/16';
import IconSettingsAdjust from '@carbon/icons-vue/es/settings--adjust/16';
import IconSettings from '@carbon/icons-vue/es/settings/16';
import IconSecurity from '@carbon/icons-vue/es/security/16';
import IconChevronUp from '@carbon/icons-vue/es/chevron--up/16';
import IconDataBase from '@carbon/icons-vue/es/data--base--alt/16';

const AppNavigationMixin = {
  components: {
    iconOverview: IconDashboard,
    iconLogs: IconTextLinkAnalysis,
    iconHealth: IconDataCheck,
    iconControl: IconSettingsAdjust,
    iconSettings: IconSettings,
    iconSecurityAndAccess: IconSecurity,
    iconExpand: IconChevronUp,
    iconResourceManagement: IconDataBase,
  },
  data() {
    return {
      navigationItems: [
        {
          id: 'overview',
          label: this.$t('appNavigation.overview'),
          route: '/',
          icon: 'iconOverview',
        },
        {
          id: 'logs',
          label: this.$t('appNavigation.logs'),
          icon: 'iconLogs',
          children: [
            {
              id: 'event-logs',
              label: this.$t('appNavigation.eventLogs'),
              route: '/logs/event-logs',
            },
            {
              id: 'post-code-logs',
              label: this.$t('appNavigation.postCodeLogs'),
              route: '/logs/post-code-logs',
            },
          ],
        },
        {
          id: 'hardware-status',
          label: this.$t('appNavigation.hardwareStatus'),
          icon: 'iconHealth',
          children: [
            {
              id: 'inventory',
              label: this.$t('appNavigation.inventory'),
              route: '/hardware-status/inventory',
            },
            {
              id: 'sensors',
              label: this.$t('appNavigation.sensors'),
              route: '/hardware-status/sensors',
            },
          ],
        },
        {
          id: 'operations',
          label: this.$t('appNavigation.operations'),
          icon: 'iconControl',
          children: [
            {
              id: 'kvm',
              label: this.$t('appNavigation.kvm'),
              route: '/operations/kvm',
            },
            {
              id: 'firmware',
              label: this.$t('appNavigation.firmware'),
              route: '/operations/firmware',
            },
            {
              id: 'reboot-bmc',
              label: this.$t('appNavigation.rebootBmc'),
              route: '/operations/reboot-bmc',
            },
            {
              id: 'host-console',
              label: this.$t('appNavigation.hostConsole'),
              route: '/operations/host-console',
            },
            {
              id: 'server-power-operations',
              label: this.$t('appNavigation.serverPowerOperations'),
              route: '/operations/server-power-operations',
            },
            {
              id: 'virtual-media',
              label: this.$t('appNavigation.virtualMedia'),
              route: '/operations/virtual-media',
            },
          ],
        },
        {
          id: 'settings',
          label: this.$t('appNavigation.settings'),
          icon: 'iconSettings',
          children: [
            {
              id: 'date-time',
              label: this.$t('appNavigation.dateTime'),
              route: '/settings/date-time',
            },
            {
              id: 'network',
              label: this.$t('appNavigation.network'),
              route: '/settings/network',
            },
          ],
        },
        {
          id: 'security-and-access',
          label: this.$t('appNavigation.securityAndAccess'),
          icon: 'iconSecurityAndAccess',
          children: [
            {
              id: 'sessions',
              label: this.$t('appNavigation.sessions'),
              route: '/security-and-access/sessions',
            },
            {
              id: 'user-management',
              label: this.$t('appNavigation.userManagement'),
              route: '/security-and-access/user-management',
            },
            {
              id: 'policies',
              label: this.$t('appNavigation.policies'),
              route: '/security-and-access/policies',
            },
            {
              id: 'certificates',
              label: this.$t('appNavigation.certificates'),
              route: '/security-and-access/certificates',
            },
          ],
        },
        {
          id: 'resource-management',
          label: this.$t('appNavigation.resourceManagement'),
          icon: 'iconResourceManagement',
          children: [
            {
              id: 'memory',
              label: this.$t('appNavigation.memory'),
              route: '/resource-management/memory',
            },
            {
              id: 'power',
              label: this.$t('appNavigation.power'),
              route: '/resource-management/power',
            },
          ],
        },
      ],
    };
  },
};

export default AppNavigationMixin;
