import { Trans } from '@lingui/macro';
import { Box, Paper, Typography } from '@mui/material';
import { AvatarSize } from 'src/components/Avatar';
import { CompactMode } from 'src/components/CompactableTypography';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { TextWithTooltip } from 'src/components/TextWithTooltip';
import { UserDisplay } from 'src/components/UserDisplay';
import { useVotingPower } from 'src/hooks/governance-data-provider/useVotingPower';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';

export function VotingPowerInfoPanel() {
  const { currentAccount } = useWeb3Context();
  const powers = useVotingPower();
  return (
    <Paper sx={{ px: 6, pb: 6, pt: 4 }}>
      <Typography
        variant="h3"
        sx={{ height: '36px', display: 'flex', alignItems: 'center', mb: 4 }}
      >
        <Trans>Your info</Trans>
      </Typography>
      <UserDisplay
        withLink={true}
        avatarProps={{ size: AvatarSize.LG }}
        titleProps={{ variant: 'h4', addressCompactMode: CompactMode.MD }}
        subtitleProps={{
          variant: 'caption',
          addressCompactMode: CompactMode.XXL,
          color: 'text.secondary',
        }}
      />
      {currentAccount && (
        <Box sx={{ display: 'flex', mt: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', mr: '25%' }}>
            <TextWithTooltip text="Voting power" variant="description" textColor="text.secondary">
              <>
                <Typography variant="subheader2">
                  <Trans>
                    Total voting power based on your AAVE/stkAAVE balance and received delegations.
                  </Trans>
                </Typography>
                <Typography variant="subheader2" mt={4}>
                  <Trans>Use it to vote for or against active proposals.</Trans>
                </Typography>
              </>
            </TextWithTooltip>
            <FormattedNumber value={powers?.votingPower || 0} variant="h2" visibleDecimals={2} />
          </Box>
          <Box>
            <TextWithTooltip
              text="Proposition power"
              variant="description"
              textColor="text.secondary"
            >
              <>
                <Typography variant="subheader2">
                  <Trans>
                    Total proposition power based on your AAVE/stkAAVE balance and received
                    delegations.
                  </Trans>
                </Typography>
                <Typography variant="subheader2" mt={4}>
                  <Trans>You need at least 80.00K power to submit a proposal.</Trans>
                </Typography>
              </>
            </TextWithTooltip>
            <FormattedNumber
              value={powers?.propositionPower || 0}
              variant="h2"
              visibleDecimals={2}
            />
          </Box>
        </Box>
      )}
    </Paper>
  );
}
